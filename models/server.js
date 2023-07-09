const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/confign')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath='/api/usuarios'
        this.authPath = '/api/auth'

        //Conectar a la base de datos
        this.conectarDB()
        
        //MIddlewares
        this.middlewares()
        //Rutas de mi aplicación
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Lectura y parsep del bpdy
        this.app.use( express.json() )

        // Directorio publico
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'))
        this.app.use( this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => console.log('Servidor corriendo en puerto', this.port))
    }

}

module.exports = Server;