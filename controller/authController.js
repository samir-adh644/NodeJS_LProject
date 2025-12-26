const { users } = require("../model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.renderHomePage = (req,res)=>{
    res.send('This is home page')
}

exports.renderRegisterPage = (req,res)=>{
    res.render("auth/register")
}

exports.handleRegisterPage = async(req,res)=>{
    const {username ,email ,password}=req.body
    if(!username || !email || !password ){
        return res.send("Pleaseprovide username,email and password")
    }

    const data = await users.findAll({
        where: {
            email:email
        }
    })
    if(data.length>0){
        return res.send("Already registered email")
    }

   await users.create({
        email:email,
        password:bcrypt.hashSync(password,5),
        username:username
    })
    res.send("Registered Successfullly!")
}

exports.renderLoginPage = (req,res)=>{
     res.render("auth/login")
}

exports.handleLoginPage = async(req,res)=>{
    const {email ,password}=req.body
    if(!email || !password ){
        return res.send("Please provide email and password")
    }

    const [data] = await users.findAll({
        where:{
            email:email
        }
    })

    if(data){
        const isMatched = bcrypt.compareSync(password,data.password)
        if (isMatched){
           const token  =  jwt.sign({id : data.id},'hahaha',{
                expiresIn : '30d'
             }        )

             res.cookie('jwtToken',token)
          
             res.send("Logged In successfully")
        }
        else{
             return res.send("Email or password incorrect")
        }
    }
    else{
        return res.send("Email or password incorrect")
    }

   
  
}