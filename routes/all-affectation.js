const express = require('express')
const router = express.Router()

const affectationController = require("../controllers/affectationController")

router.post("/affectationAdd", affectationController.addAffectation);

router.get("/affectation", affectationController.afficheAffectation);
module.exports = router