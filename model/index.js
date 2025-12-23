const {Sequelize,DataTypes} = require('sequelize')
const databaseConfig = require('../config/dbConfig')
// const makeBlogTable = require('./blogModel')
const makeUserTable = require('./userModel')


const sequelize = new Sequelize(databaseConfig.DB,databaseConfig.USER,databaseConfig.PASSWORD,{
    host : databaseConfig.HOST, 
    port :3306, 
    dialect : databaseConfig.dialect, 
    operatorsAliases : false, 
    pool : {
        max : 5, 
        min : 0, 
        acquire : 30000,
        idle : 10000
    }
})

sequelize.authenticate()
.then(()=>{
    console.log("milyo hai username password")
})
.catch((err)=>{
    console.log("error aayo hai",err)
})

const db = {};
db.Sequelize = Sequelize 
db.sequelize = sequelize



// db.blogs = makeBlogTable(sequelize,DataTypes)
db.users = require("./userModel.js")(sequelize,DataTypes);

db.sequelize.sync({force : false}).then(()=>{
    console.log("Synced done!!")
})
module.exports = db 