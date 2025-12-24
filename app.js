const express = require('express');  
const { users } = require('./model/index');
const app = express();
const PORT = 3000;
const bcrypt = require('bcrypt')

require("./model/index")

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("This is home page")
})

app.get('/register',(req,res)=>{
    res.render("auth/register")
})

app.post('/register',async(req,res)=>{
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
})


app.get("/users",async(req,res)=>{
    const data = await users.findAll()
    res.json({
        data
    })
})

app.get('/login',(req,res)=>{
     res.render("auth/login")
})

app.post('/login',async(req,res)=>{
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
            return res.send("Logged In successfully")
        }
        else{
             return res.send("Email or password incorrect")
        }
    }
    else{
        return res.send("Email or password incorrect")
    }

   
  
})


app.use(express.static('public/css/'));
app.listen(PORT,()=>{
    console.log("Server Started at port"+" $"+PORT)
})