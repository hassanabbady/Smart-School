const express = require('express')
const router = express.Router()
const multer = require('multer')

const carnetController = require("../controllers/carnetController")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

router.get("/carnetProf", carnetController.carnetProf);
router.get("/clEleve", carnetController.clEleve);
router.get("/clParent", carnetController.clParent);
router.post("/clParent", carnetController.clParent);
router.get("/deleteCarnet/:id", carnetController.deleteCarnetDirection);
router.get("/deleteCarnetProf/:id", carnetController.deleteCarnetProf);
router.get("/getcarnet/:id", carnetController.getCarnet);
router.post("/updatecarnet",uploadStorage.single('avatar'),carnetController.updateCarnet);
router.get("/carnet", carnetController.carnetDirection);
router.post("/add_carnet",uploadStorage.single('avatar'), carnetController.addCarnetDirection);
module.exports = router