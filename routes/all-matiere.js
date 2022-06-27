const express = require('express')
const router = express.Router()

const matiereController =require("../controllers/matiereController")

router.post("/add_matiere", matiereController.addMatiere);

router.get("/deleteMatiere/:id",matiereController.deleteMatiere );
router.get("/matiere",matiereController.afficheMatiere );
router.get("/updateMatiere/:id",matiereController.updateMatiereId );
router.post("/updateMatiere", matiereController.updateMatiere);
module.exports=router