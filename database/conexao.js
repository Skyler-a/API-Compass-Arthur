const mysql = require('mysql2')

const conexao =  mysql.createConnection({
    host: 'localhost', //Host do banco de dados
    port: 3306, //Porta do banco de dados. Está sendo utilizada a padrão
    user: 'root', //Usuário MYSql. Está sendo utilizado o padrão
    password: '', //Sua senha do MYSQL vai aqui
    database: 'rest_api_compass' //Nome da database. Será necessário criar em seu servidor ou máquina local.
})

module.exports = conexao