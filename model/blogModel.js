const makeBlogTable = (sequelize,DataTypes)=>{
    const Blog =  sequelize.define('blog',{
         username : {
             type : DataTypes.STRING, 
             allowNull : false
         }, 
         email : {
             type : DataTypes.STRING, 
             allowNull : false 
         }, 
         password : {
             type : DataTypes.STRING, 
             allowNull : false
         }, 

     })
     return Blog
 }
 
 module.exports = makeBlogTable