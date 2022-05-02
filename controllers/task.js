const Tasks = require('../models/task')

module.exports = app => {

    app.get('/api/v1/task', (req, res) =>  {
        Tasks.mostrarTodasAsTaskCadastradas(res);
    })
    app.post('/api/v1/task', (req, res) => {
        const task = req.body
        Tasks.criarUmaNovaTask(task, res)
    })
}