const express = require('express')
const router = express.Router()

const eleveController = require("../controllers/eleveController")



router.post("/addeleve", eleveController.addEleve);
router.get("/eleve", eleveController.afficheEleve);
router.get("/homeEleve", eleveController.homeEleve);
router.get("/homeParent", eleveController.homeParent);

module.exports = router


