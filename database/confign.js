const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN)
        console.log('Base de Datos Online')
    } catch (error) {
        console.log(error)
        throw ('Error a la hora de inciar la base de datos')
    }
}


module.exports = {
    dbConnection
}