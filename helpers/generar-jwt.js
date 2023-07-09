const jwt = require("jsonwebtoken")

const generarJWT = ( uid= '' )=>{

    return new Promise((resolve, reject)=>{

        const payload = { uid }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token)=>{
            if(err){
                console.error(err);
                reject('No se puede generar el token')
            }else{
                console.log(token)
                resolve( token )
            }
        } )

    })

}

module.exports = {
    generarJWT
}