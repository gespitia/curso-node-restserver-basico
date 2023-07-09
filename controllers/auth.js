const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs= require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt')



const login = async (req = request, res = response)=>{

    const { correo, password }=req.body

    try {

        //verificar si existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) return res.status(400).json({
            msg: 'Usuario / password no son correctos - correo'
        })

        //verificar si el usuario esta activo
        if ( !usuario.estado ) return res.status(400).json({
            msg: 'Usuario / password no son correctos - estado:false'
        })

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if ( !validPassword ) return res.status(400).json({
            msg: 'Usuario / password no son correctos - password'
        })

        //Generar el JWT
        const token = await generarJWT( usuario.id )

        res.json({
            msg:'Login ok',
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login   
}