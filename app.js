const express = require('express');  
const { users } = require('./model/index');
const app = express();
const PORT = 3000;

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
   await users.create({
        email:email,
        password:password,
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
    const {username ,password}=req.body
   await users.create({
        password:password,
        username:username
    })
    res.send("Successfully logged in ")
})


app.use(express.static('public/css/'));
app.listen(PORT,()=>{
    console.log("Server Started at port"+" $"+PORT)
})