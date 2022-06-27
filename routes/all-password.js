const express = require('express')
const router = express.Router()

const passswordController = require("../controllers/passwordController")

router.post("/generer1", passswordController.genererPost);
router.post("/genererTout", passswordController.genererTout);
router.get("/genererpwd/:id", passswordController.genererpwdID);
router.get("/generer", passswordController.generer);
module.exports = router