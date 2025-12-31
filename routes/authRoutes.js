const { handleRegisterPage, renderRegisterPage, handleLoginPage, renderLoginPage, renderForgotPasswordPage, handleForgotPassword, renderVerifyOTPPage, verifyOtp, renderResetPassword, handleResetPassword, handleLogOut } = require('../controller/authController')

const router = require ('express').Router()

router.route('/register').post(handleRegisterPage).get(renderRegisterPage)
router.route('/login').post(handleLoginPage).get(renderLoginPage)

router.route('/forgotPassword').get(renderForgotPasswordPage).post(handleForgotPassword)
router.route("/verifyOtp").get(renderVerifyOTPPage)
router.route("/verifyOtp/:id").post(verifyOtp)

router.route("/resetPassword").get(renderResetPassword)
router.route("/resetPassword/:email/:otp").post(handleResetPassword)

router.route("/logout").get(handleLogOut)

module.exports = router