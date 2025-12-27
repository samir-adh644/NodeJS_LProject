const { questions } = require("../model")

exports.renderAskquestionPage = (req,res)=>{
    res.render("questions/askQuestion")
}

exports.askquestion =async(req,res)=>{
    const {title,description}=req.body
    console.log(req.body)
    console.log(req.file)
    const userId = req.userId
    const fileName = req.file.filename
    if (!title || ! description){
        return res.send("Please provide title , description")
    }

    await questions.create({
        title,
        description,
        image :fileName,
        userId
    })
    res.redirect('/')
}

exports.getAllquestion = async(req,res)=>{
    const data = await questions.findAll({
        include :[
            {
                model:users
            }
        ]
    })
}