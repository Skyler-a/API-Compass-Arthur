const mysql = require('mysql2')

const conexao =  mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'gamesbr123',
    database: 'rest_api_compass'
})

module.exports = conexao