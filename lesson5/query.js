
const query = function(query, pool) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.query(query, (err, rows) => {
                if (err) reject(err);
                connection.release();
                resolve(rows);
            })
        })
    })
}

module.exports = query