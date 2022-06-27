const express = require('express')
const router = express.Router()
const directionController =require("../controllers/directionController")
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
  });
  
var uploads = multer({ storage: storage });


router.get("/direction", directionController.afficheDirection);

router.post("/add_direction",directionController.addDirection );

router.post("/updateDirection",directionController.updateDirection);
router.get("/updDirection/:id",directionController.updateDirectionId);
router.get("/deleteDirection/:id",directionController.deleteDirection);
router.get("/home",directionController.directionHome);
router.get("/autorisation",directionController.Autorisation);
router.post("/uploadfile",uploads.single("uploadfile"),directionController.uploadfile);


module.exports=router