const express = require('express');  
const { users } = require('./model/index');
const app = express();
const PORT = 3000;
const { renderHomePage, renderRegisterPage, handleRegisterPage, renderLoginPage, handleLoginPage }=require('./controller/authController')
const authRoute = require('./routes/authRoutes');
const questRoute = require('./routes/questionRoutes')

require("./model/index")

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.get('/',renderHomePage )

app.use('/',authRoute)

app.use('/',questRoute)







app.use(express.static('public/css/'));
app.listen(PORT,()=>{
    console.log("Server Started at port"+" $"+PORT)
})