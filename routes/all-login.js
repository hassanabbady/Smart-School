const express = require('express')
const router = express.Router()
const passport = require('passport');  // authentication
const loginController = require("../controllers/loginController")

router.get("/login", loginController.loginGet);
router.get("/newPassword", loginController.newPassword);
router.post("/login", passport.authenticate('local', { failureRedirect: '/' }), loginController.loginPost);
router.post("/newPasswordPost", loginController.newPasswordPost);
module.exports = router