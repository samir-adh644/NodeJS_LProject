const { users, questions } = require("../model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils/sendEmail")

exports.renderHomePage = async(req,res)=>{
    const data = await questions.findAll(
        {
            include : [{
                model:users
            }]
        }
    )
    res.render('components/home',{data})
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
    res.redirect('/login')
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
          
             res.redirect('/')
        }
        else{
             return res.send("Email or password incorrect")
        }
    }
    else{
        return res.send("Email or password incorrect")
    }

   
  
}

exports.renderForgotPasswordPage=(req,res)=>{
    res.render("./auth/forgotPassword")
}

exports.handleForgotPassword=async(req,res)=>{
    const {email} = req.body
    const data = await users.findAll({
        where:{
            email: email
        }
    })
    if(data.length==0) return res.send("No User registered with that email")
    
    const otp = Math.floor(Math.random() * 1000)+9999

    await sendEmail({
        email:email,
        subject:"Your reset password OTP",
        text:`Your OTP is ${otp}`
    })
    data[0].otp = otp
    data[0].otpGeneratedTime = Date.now()
    await data[0].save()

    res.redirect("/verifyOtp?email="+email)
}

exports.renderVerifyOTPPage = (req,res)=>{
    const email = req.query.email
    res.render('./auth/verifyOtp',{
        email:email
    })
}

exports.verifyOtp =async (req,res)=>{
    const {otp} = req.body
    const email = req.params.id
    const data = await users.findAll({
        where:{
            Otp:otp,
            email:email
        }
    })
    if(data.length === 0){ return res.send("Invalid Otp")}

    const currentTime = Date.now()
    const otpGeneratedTime=data[0].otpGeneratedTime
   
   
    if(currentTime-otpGeneratedTime <= 25000){
        res.redirect(`/resetPassword?email=${email}&otp=${otp}`)
    }
    else{
        res.send("Otp Expired")
    }
}

exports.renderResetPassword = async (req,res)=>{
    const {email,otp}  = req.query
    if (!email || !otp){
        return res.send("Please provide correct OTP and email")
    }
    res.render("./auth/resetPassword",{email,otp})
}

exports.handleResetPassword = async(req,res)=>{
    const {email,otp}=req.params
    const{newPassword,confirmPassword}=req.body
    if(!email|| !otp || !newPassword || !confirmPassword){return res.send("Please provide otp, email , newPassword and confirmPassword")}

    if(newPassword!==confirmPassword){
        return res.send("New password must match confirm password")
    }

    const userData = await users.findAll({
        where:{
            email:email,
            otp:otp
        }
    })
    const currentTime = Date.now()
    const otpGeneratedTime =userData[0].otpGeneratedTime
    if(currentTime-otpGeneratedTime <= 55000){
        await users.update({
            password:bcrypt.hashSync(newPassword,10)
        },{
            where:{
                email:email
            }
        })
        res.redirect("/login")
    }
    else{
        res.send("Otp Expired")
    }
    }
