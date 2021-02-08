const mysql = require("mysql")

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vacations',
    connectionLimit: 100,
})

module.exports.executeQuery = (string, params) => {
    return new Promise((resolve, reject) => {
        pool.query(string, params, (error, results, fields) => {
            if (error)
                reject(error)
            else
                resolve(results)
        })
    })
}