const { renderAskquestionPage, askquestion } = require('../controller/questionController')
const multer = require('multer')

const router = require('express').Router()
const {storage}=require('../middleware/multerConfig')
const upload = multer({storage:storage})

router.route('/askquestion').get(renderAskquestionPage).post(upload.single('image'),askquestion)



module.exports= router