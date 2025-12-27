const jwt = require('jsonwebtoken')
const {promisify} = require("util")
const { users } = require("../model")

exports.isAuthenticated = async(req,res,next)=>{
    const token = req.cookies.jwtToken
    if(!token || token == null || token== undefined){
        return res.redirect('/login')
    }
    
    const verifiedResult = await promisify(jwt.verify)(token,'hahaha')
    console.log(verifiedResult)
    const data = await users.findByPk(verifiedResult.id)
    if(!data){
        return res.send("Invalid User")
    }

    req.userId= verifiedResult.id
    next();
}