const mysql = require('mysql')
require('dotenv').config()
const { MYSQL_HOST, MYSQL_USER, MYSQL_DB, MYSQL_PW } = process.env

const db = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PW,
    database: MYSQL_DB,
    charset: 'utf8mb4'
})

db.connect(err => {if (err) throw err})

const query = (q, data) => new Promise((resolve, reject) => 
    db.query(q, data, (err, res) => err ? reject(err) : resolve(res))
)

module.exports = { db, query }