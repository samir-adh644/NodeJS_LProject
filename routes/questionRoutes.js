const { renderAskquestionPage, askquestion } = require('../controller/questionController')
const multer = require('multer')

const router = require('express').Router()
const {storage}=require('../middleware/multerConfig')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const upload = multer({storage:storage})

router.route('/askquestion').get(isAuthenticated,renderAskquestionPage).post(isAuthenticated,upload.single('image'),askquestion)



module.exports= router