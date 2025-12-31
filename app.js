const express = require('express');  
const { users } = require('./model/index');
const cookieParser= require('cookie-parser')
const app = express();
const PORT = 3000;
const { renderHomePage, renderRegisterPage, handleRegisterPage, renderLoginPage, handleLoginPage }=require('./controller/authController')
const authRoute = require('./routes/authRoutes');
const questRoute = require('./routes/questionRoutes')
const jwt = require('jsonwebtoken')
const {promisify} = require("util")
const answerRoute = require('./routes/answerRoutes')
const session = require("express-session");
const flash = require("connect-flash");

require("./model/index")

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

// using session start
app.use(session({
    secret: "thisissecretforsession",
    resave: false,
    saveUninitialized:false
}))
// using session end

// using flash start
app.use(flash());
// using flash end

app.use(async(req,res,next)=>{
    const token = req.cookies.jwtToken
    try {
          const verifiedResult = await promisify(jwt.verify)(token,'hahaha')
     if(verifiedResult)
     {
         res.locals.isAuthneticated = true
     }
     else{
         res.locals.isAuthneticated = false
     }
    }
    catch(error){
        res.locals.isAuthneticated=false
    }
   
   
    next()
})



app.get('/',renderHomePage )

app.use('/',authRoute)

app.use('/',questRoute)

app.use('/answer',answerRoute)







app.use(express.static('public/css/'));
app.use(express.static('./storage'))
app.listen(PORT,()=>{
    console.log("Server Started at port"+" $"+PORT)
})