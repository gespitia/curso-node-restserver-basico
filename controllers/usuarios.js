const { response } = require('express')

const usuariosGet = (req, res = response) => {

    const { q, nombre, apikey, page = '1', limit } = req.query

    res.json({
        msg: 'get API - Controlador',
        q, 
        nombre, 
        apikey, 
        page, 
        limit
    })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'put API - Controlador',
        id
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre, edad
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}