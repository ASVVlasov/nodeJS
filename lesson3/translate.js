const request = require('request');
const minimist = require('minimist');
const fs = require('fs');
const readLine = require('readline');

const argv = minimist(process.argv);
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startTranslate() {
    rl.question('Название файла с текстом который нужно перевести: ', (filename) => {
        fs.readFile(filename, {encoding: 'utf-8'}, (err, data) => {
            if (!err) {
                request(
                    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200115T190532Z.6fd426e3e19970a8.3ad968244f6c93acd3f717011d785d8cc4217638&lang=ru&text=${data}`,
                    (err, request, body) => {
                        if (!err && request.statusCode === 200) {
                            body = JSON.parse(body);
                            console.dir(body.text[0]);
                            startTranslate();
                        } else {
                            console.log('не удалось перевести');
                            rl.close();
                        }
                    }
                ); 
            } else {
                console.log(`файл ${filename} невозможно прочитать или его не существует. попробуйте еще раз`);
                rl.close();
            }
        });
    });
}

console.log('Вас приветствует переводчик, использующий Yandex API');
startTranslate();