const Role = require('../models/role')
const usuario = require('../models/usuario')

const esRoleValido =async (rol='') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no está en la BD`)
    }
}

const emailExiste = async (correo='')=>{
    const exiseEmail = await usuario.findOne({correo})

    if(exiseEmail){
        throw new Error(`El email ${correo} ya esta registrado en la BD`)
    }
}

const userExisteById = async (id)=>{
    const existeUserId = await usuario.findById(id)

    if(!existeUserId){
        throw new Error(`El usuario no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    userExisteById
}