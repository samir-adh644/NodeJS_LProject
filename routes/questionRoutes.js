const { renderAskquestionPage } = require('../controller/questionController')

const router = require('express').Router()

router.route('/askquestion').get(renderAskquestionPage)



module.exports= router