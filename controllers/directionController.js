const db = require("../models/cahier");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const flash = require('connect-flash');

const directionHome = (req, res) => {
  if (profil == "Direction") {
    res.render("direction/home", { mytitle: "Direction", login_info: true });
  }
  else {
    res.redirect("/")
  }

}
const afficheDirection = (req, res) => {


  db.User.find({type:'Direction'})
    .then((result) => {

      if (!result) {
        res.render("direction/add_direction", { mytitle: "Direction", dataDirection: result, login_info: false, message: req.flash('message') });
      }
      else {
        res.render("direction/add_direction", { mytitle: "Direction", dataDirection: result, login_info: true, message: req.flash('message') });
      }

    })
    .catch((err) => {
      console.log(err);
    });
}





const addDirection = (req, res) => {
  if (profil == "Direction") {
    password = req.body.password;

    db.User.register({
      firstname: req.body.firstname,

      lastname: req.body.lastname,
      username: req.body.username,
   type:'Direction',
      profession: req.body.profession,
      gsm: req.body.gsm,
      tel: req.body.tel,
      adress: req.body.adress,
      
    }, password, function (err, user) {
      if (!err) {
        req.flash('message', 'Compte enregistré');
        res.redirect("/direction")
      } else {
        req.flash('message', err.message);
        res.redirect("/direction")
      }

    })
  }


}
const updateDirectionId = (req, res) => {
  if (profil == "Direction") {

    db.User.findOne({ _id: req.params.id }, (err, direction) => {
      console.log(direction)
      if (direction.gsm == '123') {
        console.log('Disconnected')
        res.redirect('/logout')
      }
      if (!err) {

        res.render("direction/update_direction", {
          direction: direction, mytitle: "Modifier", login_info: true
        })
      } else {
        console.log(err)
      }
    }

    )
  }
  else {
    res.redirect("/")
  }

}
const updateDirection = (req, res) => {
  if (profil == "Direction") {

    let updateDirection = {

      firstname: req.body.firstname,

      lastname: req.body.lastname,

      profession: req.body.profession,
      gsm: req.body.gsm,
      tel: req.body.tel,
      adress: req.body.adress,
      dateUpdated: Date.now(),
    }

    let query = { _id: req.body.id }
    db.User.updateOne(query, updateDirection, (err) => {
      if (!err) {
        req.flash('message', 'Compte modifié');
        res.redirect("/direction")

      } else {
        req.flash('message', err.message);
        res.redirect("/direction")
      }
    })
  }
  else {
    res.redirect("/")
  }

}


const deleteDirection = (req, res) => {
  if (profil == "Direction") {

    db.User.findByIdAndRemove(req.params.id)
      .then((result) => {
        req.flash('message', 'Compte supprimé');
        res.redirect("/direction");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    res.redirect("/")
  }


}

const Autorisation = (req, res) => {
  if (profil == "Direction") {
    db.Classe.find()
      .then((result) => {
        db.Matiere.find()
          .then((result1) => {

            res.render("autorisation/index", { mytitle: "Autorisation", dataMatiere: result1, dataClasse: result, login_info: true });

          })
      })
      .catch((err) => {
        console.log(err);
      });

  }
  else {
    res.redirect("/")
  }


}


const uploadfile = (req, res,err) => {
  if (profil == "Direction") {

    importExcelData2MongoDB("./public/uploads/" + req.file.filename);
if(err){
      req.flash('message', err.message);
      res.redirect("/direction")
    }
    res.redirect('/direction');
    console.log(res);
    
  }
  else {
    res.redirect("/")
  }

}

// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath) {
  // -> Read Excel File to Json Data

  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [{
      // Excel Sheet Name
      name: 'Directions',
      // Header Row -> be skipped and will not be present at our result object.
      header: {
        rows: 1
      },
      // Mapping columns to keys
      columnToKey: {
        A: 'firstname',
        B: 'lastname',
        C: 'username',
        D: 'profession',
        E: 'gsm',
        F: 'tel',
        G: 'adress',
        
      }
    }]

  });

  db.User.insertMany(excelData.Directions, (err, data) => {

    if (err) {
      
    } else {

    }
  });
  fs.unlinkSync(filePath);
}





////////////////////////////////////////////////////
module.exports = {
  afficheDirection,
  addDirection,
  updateDirection,
  updateDirectionId,
  deleteDirection,
  directionHome,
  Autorisation,
  uploadfile
}