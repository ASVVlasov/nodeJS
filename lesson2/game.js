const eventEmitter = require('events').EventEmitter;
const readLine = require('readline');
const minimist = require('minimist');
const logger = require('./logger');

const argv = minimist(process.argv, {
    alias: {
        help: 'h',
        file: 'f'
    }
});

if (argv.help) {
    console.log('Список комманд:');
    console.log('-f=[filename].[ext] - имя файла для логгирования');
    console.log('-h                  - справка');
} else {

    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const Log = new logger(argv.file ? argv.file : 'log.txt');
    
    class Game extends eventEmitter {
        start() {
            this.emit('start');
        }
    
        tossCoin(answer) {
            const roll = Math.round(Math.random() + 1);
            const winning = answer === roll.toString();
            if (winning) {
                this.emit('winning');
            } else {
                this.emit('loosing');
            }
            Log.write({winning: winning})
            this.start();
        }
    }
    
    const game = new Game();
    game.on('start', () => {
        rl.question('Выбери сторону монеты: "Орел"(1)/"Решка"(2) или введи "exit" чтобы выйти: ', (answer) => {
            if (answer === '1' || answer === '2') {
                game.tossCoin(answer);
            } else if (answer === 'exit') {
                rl.close();
            } else {
                console.log('Нужно ввести цифры 1 или 2, попробуй еще раз');
                game.start();
            }
        })
    })
    game.on('winning', () => {
        console.log('Урааа! Ты победил!');
    })
    game.on('loosing', () => {
        console.log('К сожалению ты проиграл(((');
    })
    console.log('Привет! Это игра "Орел и Решка"');
    console.log('Компьютер подбрасывает монету и тебе нужно угадать сторону');
    game.start();
}