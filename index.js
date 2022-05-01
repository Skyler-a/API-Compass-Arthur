const customExpress = require('./config/customExpress')
const conexao = require('./database/conexao')
const connection = require('./database/conexao')
const Tabelas = require('./database/tabelas')

connection.connect(err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Conectado com sucesso')
        
        Tabelas.init(conexao)
        const app = customExpress()

        app.listen(3000, () => console.log('Rodando na porta 3000'))

    }

})

