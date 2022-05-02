const Users = require('../models/users')

module.exports = app => {

    // Puxar todos os usuários cadastrados
    app.get('/api/v1/user', (req, res) =>  {
        Users.mostrarTodosOsUsuariosCadastrados(res)
    })

    // Puxar um usuário cadastrado pelo ID dele
    app.get('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Users.localizarPorId(id, res)
    })

    // Cadastrar um novo usuário
    app.post('/api/v1/user', (req, res) => {
        const users = req.body
        Users.cadastrarNovoUsuario(users, res)
    })

    // Atualizar um usuário, não sendo necessário passar todos os campos
    app.put('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Users.updatePorPut(id, values, res)
    })

    // Atualizar um usuário sendo necessário passar todos os campos
    app.patch('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Users.updatePorPatch(id, values, res)
    })

    // Deletar um usuário
    app.delete('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Users.delete(id, res)
    })

}