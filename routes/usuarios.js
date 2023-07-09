//Paquetes
const { Router } = require('express');
const { check } = require('express-validator');
//controllers
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
//middelwares
const { validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares')
//helpers
const { esRoleValido, emailExiste, userExisteById } = require('../helpers/db-validators');
//========================================Code=====================================================

const router = Router();

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( userExisteById ),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom( emailExiste ),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.patch('/', usuariosPatch)

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( userExisteById ),
    validarCampos
],usuariosDelete)

module.exports = router;