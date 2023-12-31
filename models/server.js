const express = require('express')
const cors = require('cors')
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath='/api/usuarios'

        //MIddlewares
        this.middlewares()
        //Rutas de mi aplicación
        this.routes()
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
        this.app.use( this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => console.log('Servidor corriendo en puerto', this.port))
    }

}

module.exports = Server;