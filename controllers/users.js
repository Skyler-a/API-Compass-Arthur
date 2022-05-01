const Users = require('../models/users')

module.exports = app => {

    app.get('/api/v1/user', (req, res) =>  {
        Users.mostrarTodosOsUsuariosCadastrados(res)
    })


    app.get('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Users.localizarPorId(id, res)
    })

    app.post('/api/v1/user', (req, res) => {
        const users = req.body
        Users.cadastrarNovoUsuario(users, res)
    })

    app.put('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Users.updatePorPut(id, values, res)
    })

    app.patch('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Users.updatePorPatch(id, values, res)
    })

    app.delete('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Users.delete(id, res)
    })

}