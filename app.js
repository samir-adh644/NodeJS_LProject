const express = require('express');  
const { users } = require('./model/index');
const app = express();
const PORT = 3000;
const { renderHomePage, renderRegisterPage, handleRegisterPage, renderLoginPage, handleLoginPage }=require('./controller/authController')

require("./model/index")

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',renderHomePage )

app.get('/register',renderRegisterPage)

app.post('/register',handleRegisterPage)


app.get("/users",async(req,res)=>{
    const data = await users.findAll()
    res.json({
        data
    })
})

app.get('/login',renderLoginPage)

app.post('/login',handleLoginPage)


app.use(express.static('public/css/'));
app.listen(PORT,()=>{
    console.log("Server Started at port"+" $"+PORT)
})