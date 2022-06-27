const db = require("../models/cahier");
const excelToJson = require('convert-excel-to-json');
const flash = require('connect-flash');
const fs = require('fs');
const accueilProf = (req, res) => {
    res.render("prof/home", { mytitle: "Enseignants", login_info: true });
}
const afficheProfs = (req, res) => {
    db.User.find(({type:'Profs'}))
        .then((result) => {
           
            res.render("prof/add_prof", { mytitle: "Enseignant", dataProf: result, login_info: true, message: req.flash('message') });
        })
        .catch((err) => {
            console.log(err);
        });
}
const addProfs = (req, res) => {
    if (profil == "Direction") {
        password = req.body.password;
    
        db.User.register({
          firstname: req.body.firstname,
    
          lastname: req.body.lastname,
          username: req.body.username,
       
          profession: req.body.profession,
          gsm: req.body.gsm,
          tel: req.body.tel,
          adress: req.body.adress,
          type: 'Profs'
        }, password, function (err, user) {
          if (!err) {
            req.flash('message', 'Compte enregistré');
            res.redirect("/prof")
          } else {
            req.flash('message', err.message);
            res.redirect("/prof")
          }
    
        })
      }
    
   
}
const updateProfsId = (req, res) => {
    db.User.findOne({ _id: req.params.id }, (err, prof) => {
        if (!err) {
            res.render("prof/update_prof", {
                prof: prof, mytitle: "Modifier", login_info: true
            })
        } else {
            console.log(err)
        }
    }

    )
}
const updateProfs = (req, res) => {
    let updateProf = {
        civ: req.body.civ,
        firstname: req.body.firstname,

        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        profession: req.body.profession,
        gsm: req.body.gsm,
        tel: req.body.tel,
        adress: req.body.adress,
        dateUpdated:Date.now(),
    }

    let query = { _id: req.body.id }
    db.User.updateOne(query, updateProf, (err) => {
        if (!err) {
            req.flash('message', 'Enseignant modifié');
            res.redirect("/prof")

        } else {
            console.log(err)
        }
    })

}


const deleteProf = (req, res) => {

    db.User.findByIdAndRemove(req.params.id)
        .then((result) => {
            req.flash('message', 'Enseignant supprimé');
            res.redirect("/prof");
        })
        .catch((err) => {
            console.log(err);
        });

}


const uploadfile = (req, res) => {
    importExcelData2MongoDB("./public/uploads/" + req.file.filename);
    res.redirect('/prof');
    console.log(res);
}

// Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath) {
    // -> Read Excel File to Json Data
   
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            // Excel Sheet Name
            name: 'Profs',
            // Header Row -> be skipped and will not be present at our result object.
            header: {
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'civ',
                B: 'firstname',
                C: 'lastname',
                D: 'username',
                E: 'profession',
                F: 'gsm',
                G: 'tel',
                H: 'adress',
            }
        }]

    });
    // -> Log Excel Data to Console
    console.log(excelData.Directions);


    // Insert Json-Object to MongoDB
    db.User.insertMany(excelData.Profs, (err, data) => {
        if (err) {
            // console.log(err);
        } else {

        }
    });
    fs.unlinkSync(filePath);
}


module.exports = {
    afficheProfs,
    addProfs,
    updateProfs,
    updateProfsId,
    deleteProf,
    accueilProf,
    uploadfile
}