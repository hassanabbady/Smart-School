const express = require('express')
const router = express.Router()
const profsController =require("../controllers/profsController")
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



router.get("/prof", profsController.afficheProfs);

router.post("/add_prof",profsController.addProfs );

router.post("/updateProf",profsController.updateProfs);
router.get("/updProf/:id",profsController.updateProfsId);
router.get("/deleteProf/:id",profsController.deleteProf);
router.get("/accueilProf",profsController.accueilProf);
router.post("/uploadfileProf",uploads.single("uploadfile"),profsController.uploadfile);
module.exports=router