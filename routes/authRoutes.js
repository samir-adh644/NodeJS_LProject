const { handleRegisterPage, renderRegisterPage, handleLoginPage, renderLoginPage, renderForgotPasswordPage, handleForgotPassword, renderVerifyOTPPage } = require('../controller/authController')

const router = require ('express').Router()

router.route('/register').post(handleRegisterPage).get(renderRegisterPage)
router.route('/login').post(handleLoginPage).get(renderLoginPage)

router.route('/forgotPassword').get(renderForgotPasswordPage).post(handleForgotPassword)
router.route("/verifyOTP").get(renderVerifyOTPPage)


module.exports = router