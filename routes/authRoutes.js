const { handleRegisterPage, renderRegisterPage, handleLoginPage, renderLoginPage } = require('../controller/authController')

const router = require ('express').Router()

router.route('/register').post(handleRegisterPage).get(renderRegisterPage)
router.route('/login').post(handleLoginPage).get(renderLoginPage)

module.exports = router