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
    console.log('-f=[filename].[ext] - имя файла для анализа');
    console.log('-h                  - справка');
} else if (argv.file) {
    const Log = new logger(argv.file);
    Log.read().then(
        (data) => {
            const gameResult = {
                allCount: data.length,
                winning: 0,
                loosing: 0,
                winStreak: 0,
                loosStreak: 0
            }
            let winStreak = 0;
            let loosStreak = 0;
            console.dir(data);
            data.forEach(item => {
                if (item.winning) {
                    gameResult.winning++;
                    winStreak++;
                    loosStreak = 0;
                } else {
                    gameResult.loosing++;
                    loosStreak++;
                    winStreak = 0;
                }
                if (gameResult.loosStreak < loosStreak) {
                    gameResult.loosStreak = loosStreak;
                }
                if (gameResult.winStreak < winStreak) {
                    gameResult.winStreak = winStreak;
                }
            });
            console.log(`Всего сыграно партий: ${gameResult.allCount}`);
            console.log(`Победы/поражения: ${gameResult.winning}/${gameResult.loosing}`);
            console.log(`Максимальное кол-во побед подряд: ${gameResult.winStreak}`);
            console.log(`Максимальное кол-во поражений подряд: ${gameResult.loosStreak}`);
        },
        (error) => {
            if (error.errorExist) {
                console.log(`${Log.filename} не существует`);
            }
        }
    );
} else {
    console.log('неверный вызов наберите с ключом -h чтобы вызвать справку');
}