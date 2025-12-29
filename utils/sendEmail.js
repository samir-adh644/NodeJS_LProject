const nodemailer = require('nodemailer')
const sendEmail = async(data)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:'adhikarisamir644@gmail.com',
            pass:'zalrstuiimhczfny'
        }
    })
    const mailOption={
        from: "nodejsDP<new123@gmail.com",
        to : data.email,
        subject:data.subject,
        text : data.text
    }
   await transporter.sendMail(mailOption)
}

module.exports = sendEmail