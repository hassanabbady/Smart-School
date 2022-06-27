const express = require('express')
const router = express.Router()

const classeController = require("../controllers/classeController")

router.post("/add_classe", classeController.addClasse);

router.get("/deleteClasse/:id", classeController.deleteClasse);
router.get("/classe", classeController.afficheClasse);
router.get("/updateClasse/:id",classeController.updateClasseId );
router.post("/updateClasse", classeController.updateClasse);
module.exports = router