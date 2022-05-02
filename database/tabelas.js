class Tabelas {
    init(connection) {
        this.connection = connection

        this.createUser()
        this.createTask()
    }

    createUser() {
        const sql = `CREATE TABLE IF NOT EXISTS Usuarios (id int NOT NULL AUTO_INCREMENT, name varchar(70) NOT NULL, cpf varchar(11) NOT NULL, birthDate DATE NOT NULL, email varchar(50) NOT NULL, password varchar(30) NOT NULL, address varchar(200) NOT NULL, number varchar(15) NOT NULL, complement varchar(60) NOT NULL, city varchar(50) NOT NULL, state varchar(25) NOT NULL, country varchar(55) NOT NULL, zipCode varchar(8) NOT NULL, PRIMARY KEY (id))`

        this.connection.query( sql, err => {
            if(err) {
                console.log(err)
            } else {
                console.log('Tabela Usuários criada com sucesso')
            }
        })
    }
    createTask() { 
        const sql = `CREATE TABLE IF NOT EXISTS Task (
			id_task int PRIMARY KEY NOT NULL auto_increment,
            description varchar(200) NOT NULL, 
            date DATETIME NOT NULL,
            user int,
            CONSTRAINT fk_UserTask FOREIGN KEY (user) REFERENCES usuarios (id));`

        this.connection.query(sql, err => {
            if(err) {
                console.log(err)
            } else {
                console.log('Tabela de Task criada com sucesso')
            }
        })

    }

} 


module.exports = new Tabelas;