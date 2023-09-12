const jwt = require('jsonwebtoken')
const configEnv = require('../config/index.config')

checkLoginToken = (req, res, next) => {
    const auth = req.headers.authorization
    if(!auth){
        return res.send({
            status: false,
            message: "Access Denied, No token provided"
        })
    }
    // bearer token
    const split = auth.split(' ')

    console.log(auth)

    const token = split[1]

    jwt.verify(token, configEnv.token_secret, (err, decoded) => {
        if(err){
            return res.send({
                status: false,
                message: "Access Denied: Token expired"
            })
        }
        console.log(decoded)
        const userId = decoded.id
        req.userId = userId
        next()
    })
}
const middleware = {
    checkLoginToken
}
module.exports = middleware