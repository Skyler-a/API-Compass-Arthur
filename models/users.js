const moment = require('moment')
const connection = require('../database/conexao')

class Users {

    cadastrarNovoUsuario(users, res) {
        const birthDate = moment(users.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const birthDateIsValid = moment().diff(birthDate, 'years', false) >= 18
        const passwordIsValid = users.password.length >= 6

        const validation = [
            {
                name: 'birthDate',
                valido: birthDateIsValid,
                message: 'Você deve ser maior de idade para se cadastrar'
            },
            {
                name: 'password',
                valid: passwordIsValid,
                message: 'Sua senha deve conter ao menos 6 dígitos'
            },

        ]

        const errors = validation.filter(campo => !campo.valido)
        const errorsExist = errors.length

        if(errorsExist) {
            res.status(400).json(errors)
        } else {
            const bDate = {...users, birthDate}

            const sql = 'INSERT INTO usuarios SET ?'

            connection.query(sql, bDate, (err, results) => {
                if(err) {
                    res.status(400).json(err)
                } else {
                    res.status(201).json(users)
                }
            })

        }

    } 

    mostrarTodosOsUsuariosCadastrados(res) {
        const sql = 'SELECT * FROM usuarios'

        connection.query(sql, (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(results)
            }

        })

    }

    localizarPorId(id, res) {
        const sql = `SELECT * FROM usuarios WHERE id=${id}`
    
        connection.query(sql, (err, results) => {
            const user = results[0]
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(user)
            }

        })
    }

    updatePorPut(id, values, res) {
        if(values.birthDate) {
            values.birthDate = moment(values.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        const sql = 'UPDATE usuarios SET ? WHERE id=?'

        connection.query(sql, [values, id], (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(201).json({...values, id}) 
            }
        })
    }

    updatePorPatch(id, values, res) {
        if(values.birthDate) {
            values.birthDate = moment(values.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        const sql = 'UPDATE usuarios SET ? WHERE id= ? '

        connection.query(sql, [values, id], (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json({...values, id}) 
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM usuarios WHERE id=?'

        connection.query(sql, id, (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(`O usuário de id ${id} foi deletado com sucesso`)

            }
        })
    }
    
}

module.exports = new Users
