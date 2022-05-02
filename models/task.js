const conexao = require('../database/conexao');
const moment = require('moment')

class Tasks {
    criarUmaNovaTask(task, res) {

        const date = moment(task.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const currentDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const dateIsValid = moment(date).isSameOrAfter(currentDate)


        const validation = [
            {
                nome: 'Data inválida',
                valido: dateIsValid,
                mensagem: 'Insira uma data posterior ao dia de hoje'
            }
        ]
        const erros = validation.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {

            const Tasks = {...task, date}
            const sql = `INSERT INTO task SET ?`

            conexao.query(sql, Tasks, (err, results) => {
                if (err) {
                    res.status(404).json(err)
                } else {
                    res.status(202).json(task)
                }
            })
        }
    }

    mostrarTodasAsTaskCadastradas(res) {
        const sql = `SELECT task.id_task, usuarios.name, task.description, task.date, task.user FROM task join usuarios on usuarios.id = task.user`

        conexao.query(sql, (err, results) => {
            if (err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(results)
            }

        })
    }
}
module.exports = new Tasks;