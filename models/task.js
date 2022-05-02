const conexao = require('../database/conexao');
const moment = require('moment')

class Tasks {
    //Função para criar uma nova task
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
    // Função para Mostrar todas as Tasks Cadastradas
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
    //Função para mostrar as tasks relacionadas ao ID do usuário
    mostrarTaskRelacionadaAoUsuario(id, res) {
            const sql = `SELECT task.id_task, usuarios.name, task.description, task.date, task.user FROM task join usuarios on usuarios.id = task.user WHERE user=${id}`
    
                conexao.query(sql, (err, results) => {
                const user = results
                if(err) {
                    try{} catch{res.status(400)}
                } else {
                    res.status(200).json(user)
                }
            })
    }
    //Função para mostrar uma task pelo ID
    mostrarTaskPorID(id_task, res) {
        const sql = `SELECT task.id_task, usuarios.name, task.description, task.date, task.user FROM task join usuarios on usuarios.id = task.user WHERE id_task=${id_task}`
    
            conexao.query(sql, (err, results) => {
                if (results.length == 0) {
                        res.status(404).json([{message: 'task não encontrada'}])
                    } else if (err) {
                        res.status(500).json(err)
                    } else {
                        res.status(200).json(results)
                    }
    })
    }
    //Função para deletar uma task
    deletarUmaTask(id, res) {
        const sql = 'DELETE FROM task WHERE id_task=?'

        conexao.query(sql, id, (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(204).json([{message: 'Task deletada com sucesso'}])
            }
        })
    }
    //Função para atualizar uma task
    updatePorPut(id, values, res) { 
        if(values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        const sql = 'UPDATE task SET ? WHERE id_task=?'

        conexao.query(sql, [values, id], (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(201).json({...values, id}) 
            }
        })
    }
}

module.exports = new Tasks;