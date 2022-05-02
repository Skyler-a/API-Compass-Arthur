const Tasks = require('../models/task')

module.exports = app => {
    // Puxar todas as Tasks existentes do banco de dados
    app.get('/api/v1/task', (req, res) =>  {
        Tasks.mostrarTodasAsTaskCadastradas(res);
    })

    // Puxar uma task do banco de dados pelo ID dela
    app.get('/api/v1/task/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Tasks.mostrarTaskPorID(id, res)
    })

    // Puxar todas as tasks relacionadas ao ID de usuário
    app.get('/api/v1/user/task/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Tasks.mostrarTaskRelacionadaAoUsuario(id, res)
    })

    // Cadastrar uma nova task
    app.post('/api/v1/task', (req, res) => {
        const task = req.body
        Tasks.criarUmaNovaTask(task, res)
    })

    // Deletar uma Task
    app.delete('/api/v1/task/:id',(req, res) => {
        const id = parseInt(req.params.id)
        Tasks.deletarUmaTask(id, res)
    })

    // Atualizar uma Task
    app.put('/api/v1/task/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Tasks.updatePorPut(id, values, res)
    })    
}