const request = require('request');
const cheerio = require('cheerio');

request('https://lenta.ru/', (err, request, body) => {
    if (!err && request.statusCode === 200) {
        const $ = cheerio.load(body);
        const times = $('.js-top-seven .item .time').text();
        const news = $('.js-top-seven .item>a');
        console.log(news, 'Top news today:');
        news.each((i, newsItem) => {
            const time = $(newsItem).children('time').text();
            const data = newsItem.children[1].data;
            console.log(`--- ${time}:${data};`);
        });
    }
})