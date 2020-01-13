const fs = require('fs');

class Logger {
    constructor(filename) {
        this.filename = filename;
    }

    write(message) {
        this.read().then(
            (data) => {
                data.push(message);
                fs.writeFile(this.filename, JSON.stringify(data, null, 2), () => {
                });
            },
            (error) => {
                if (error.errorExist) {
                    fs.writeFile(this.filename, JSON.stringify([message], null, 2), () => {
                    });
                }
            }
        );
    }

    read() {
        return new Promise((resolve, reject) => {
            fs.access(this.filename, fs.constants.F_OK, (err) => {
                if (err) {
                    reject({errorExist: true});
                } else {
                    fs.readFile(this.filename, (err, data) => {
                        if (err) {
                            reject({errorRead: true});
                        } else {
                            resolve(JSON.parse(data));
                        }
                    })
                }
            })
        });
    }
}

module.exports = Logger