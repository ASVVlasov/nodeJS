const express = require('express');
const consolidate = require('consolidate')
const hbs = require('handlebars');
const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const server = express();

server.engine('hbs', consolidate.handlebars);
server.set('view engine', 'hbs');
hbs.registerPartial('result', fs.readFileSync(path.resolve(__dirname, 'views', 'partials', 'result.hbs')).toString());

server.set('views', path.resolve(__dirname, 'views'));
server.use('/', express.static(path.resolve(__dirname, 'assets')));
server.use(cookieParser());

// получаем список новостей от яндекса
let getNews = function (params) {
    return new Promise((resolve, reject) => {
        let url = 'https://yandex.ru/news',
            double = false;
        if (categories.length !== 0) {
            if (params.categoryId) {
                if (categories[params.categoryId]) {
                    url = categories[params.categoryId].href;
                }
            }
        } else { 
            // если список категоирий пуст а в параметрах запроса есть categoryId
            // то сначала получаем список категорий а потом делаем второй запрос на получение новостей конкретной
            if (params.categoryId) {
                double = true;
            }
        }
        request(url, (err, request, body) => {
            if (!err && request.statusCode === 200) {
                const $ = cheerio.load(body);
                const yaCategories = $('a.link.link_theme_dark');
                const yaNews = $('a.link.link_theme_black');
                categories = [];
                yaCategories.each((i, item) => {
                    categories.push({
                        text: $(item).text(),
                        href: $(item).attr('href'),
                        selected: i === +params.categoryId
                    });
                });
                if (double) {
                    getNews(params).then(
                        (data) => {
                            resolve(data);
                        }
                    )
                } else {
                    news = [];
                    yaNews.each((i, item) => {
                        news.push({
                            text: $(item).text(),
                            href: `https://yandex.ru${$(item).attr('href')}`
                        });
                    });
                    //если параметр запроса на ограничение записей установлен обрезаем новости до нужного кол-ва
                    if (params.limit) {
                        news.splice(params.limit);
                    }
                    resolve({categories: categories, news: news});
                }
            } else {
                reject(err);
            }
        })
    });
}

let categories = [];
let news = [];
server.get('/', (req, res) => {
    req.query.categoryId = !req.query.categoryId ? req.cookies.categoryId : req.query.categoryId;
    req.query.limit = !req.query.limit ? req.cookies.limit : req.query.limit;
    console.log(req.query, req.cookies);
    getNews(req.query).then(
        (data) => {
            let counts = [10, 20, 50, 100].map((item) => ({value: item, selected: +req.query.limit === item}));

            res
            .cookie('categoryId', req.query.categoryId)
            .cookie('limit', req.query.limit)
            .render('index', {
                categories: data.categories,
                news: data.news,
                counts: counts
            });
        },
        (err) => {
            res.send(err);
        }
    );
})

server.listen(8080, () => {
    console.log(`http://localhost:8080/`);
})