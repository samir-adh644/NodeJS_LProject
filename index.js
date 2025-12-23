const express = require('express')  
const app = express();
const PORT = 3000;

app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.send("This is home page")
})

app.get('/register',(req,res)=>{
    res.render("auth/register")
})

app.get('/login',(req,res)=>{
     res.render("auth/login")
})


app.use(express.static('public/css/'));
app.listen(PORT,()=>{
    console.log("Server Started at port"+" $"+PORT)
})