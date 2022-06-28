const db = require("../models/cahier");
const flash = require('connect-flash');
const fs = require('fs')


const carnetProf = (req, res) => {
  if (profilProf == "Profs") {
  db.User.findOne({ username: req.session.passport.user }, (err, resultat) => {
    db.Affectation.find({ prof: resultat._id })
      .populate(['prof firstname lastname'])
      .populate('classe', 'name')
      .populate('matiere', 'name')
      .then((data) => {
        db.Classe.find()
          .then((result) => {
            db.Matiere.find()
              .then((result1) => {
                db.Carnet.find({ prof: resultat._id }).sort({ dateUpdated: -1 })
                  .populate('classe', 'name')
                  .populate('matiere', 'name')
                  .populate(['prof firstname lastname'])
                  .then((carnet) => {
                    console.log(resultat._id);
                    // res.render("carnet_de_liaison/carnet_liaison_Prof", { mytitle: "Carnet de liaison", dataCarnet: carnet, login_info: true });
                    res.render("carnet_de_liaison/carnet_liaison_Prof", { mytitle: "Carnet de liaison", data: data, dataMatiere: result1, login_info: true, dataClasse: result, dataCarnet: carnet, classeProf: data, login_info: true, message: req.flash('message') });
                  })
              })
          })
          .catch((err) => {
            console.log(err);
          });


      })


      .catch((err) => {
        console.log(err);
      });
  })
  }
}
const carnetDirection = (req, res) => {
  if (profil == "Direction") {
  db.Classe.find()
    .then((result) => {
      db.Matiere.find()
        .then((result1) => {
          db.Carnet.find({}).sort({ dateUpdated: -1 })
            .populate('classe', 'name')
            .populate('matiere', 'name')
            .populate(['prof firstname lastname'])
            .then((carnet) => {

              res.render("carnet_de_liaison/carnet_liaison", { mytitle: "Carnet de liaison", dataMatiere: result1, dataClasse: result, dataCarnet: carnet, login_info: true, message: req.flash('message') });
            })
        })
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

const clEleve = (req, res) => {
  if (profilEleve == "Elèves") {

    db.User.findOne({ username: req.session.passport.user }, (err, resultat) => {

      db.Eleve.findOne({ emailEleve: req.session.passport.user })
        .then((classe) => {

          db.Carnet.find({ classe: classe.classe }).sort({ dateUpdated: -1 })
            .populate('classe', 'name')
            .populate('matiere', 'name')
            .populate(['prof firstname lastname'])
            .then((carnet) => {

              // res.render("carnet_de_liaison/carnet_liaison_Prof", { mytitle: "Carnet de liaison", dataCarnet: carnet, login_info: true });
              res.render("carnet_de_liaison/clEleve", { mytitle: "Carnet de liaison", login_info: true, dataCarnet: carnet, message: req.flash('message') });
            })
        })

        .catch((err) => {
          console.log(err);
        });


    })


      .catch((err) => {
        console.log(err);
      });

  }


}


const clParent = (req, res) => {
  if (profilParent == "Parents") {

   
  

    db.User.findOne({ username: req.session.passport.user })
      .then((data) => {



        data.identifiant.forEach(item => {

          db.Eleve.find({ emailParent: req.session.passport.user })
            .then((dataEleve) => {

     

              db.Eleve.findOne({ emailParent: req.session.passport.user, _id: item })
                .then((eleve) => {
                  let carnet = ""
                  db.Carnet.find({ classe: eleve.classe }).sort({ dateUpdated: -1 })
                    .populate('classe', 'name')
                    .populate('matiere', 'name')
                    .populate(['prof firstname lastname'])
                    .then((carnet) => {

                      // res.render("carnet_de_liaison/carnet_liaison_Prof", { mytitle: "Carnet de liaison", dataCarnet: carnet, login_info: true });
                      res.render("carnet_de_liaison/clParent", { mytitle: "Carnet de liaison", login_info: true, dataCarnet: carnet, dataEleve: dataEleve, message: req.flash('message') });
                    })
                })
            })
            .catch((err) => {
              console.log(err);
            });
        })
      });






  }

}


const addCarnetDirection =  (req, res) => {
  if (profilProf == "Profs") {
    console.log(req)
let files
if(req.file==undefined){
  files="Rien"

}else{
  console.log('yes')
  files=req.file.filename
}




  const carnet = new db.Carnet({
    prof: req.body.id,
    title: req.body.title,
    date1: req.body.date1,
    date2: req.body.date2,
    classe: req.body.classe,
    matiere: req.body.matiere,
    description: req.body.description,
    avatar: files,
  });

  carnet
    .save()
    .then((result) => {
      // async function resizeImage() {
      //   try {
      //     await sharp("public/uploads/"+result.avatar)
      //       .resize({
      //         width: 300,
      //         height: 300
      //       })
      //       .toFile("public/uploads/"+'01'+result.avatar);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      // resizeImage();
      req.flash('message', 'Succès!!');
      // res.send(req.flash('message'));
      res.redirect("/carnetProf");
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
const deleteCarnetDirection = (req, res) => {
  if (profil == "Direction") {


  

  db.Carnet.findByIdAndRemove(req.params.id)
    .then((result) => {

      // const path = result.avatar

try {
  fs.unlinkSync("public/uploads/"+ result.avatar)
  //file removed
} catch(err) {
  console.error(err)
}
console.log(result);

 res.redirect("/carnet");
     
    })
    .catch((err) => {
      console.log(err);
    });
 }
}
const deleteCarnetProf = (req, res) => {
  if (profilProf == "Profs") {

  db.Carnet.findByIdAndRemove(req.params.id)
    .then((result) => {
      
try {
  fs.unlinkSync("public/uploads/"+ result.avatar)
  //file removed
} catch(err) {
  console.error(err)
}

 res.redirect("/carnet");
     
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

const getCarnet = (req, res) => {
  db.User.findOne({ username: req.session.passport.user }, (err, resultat) => { 

  db.Affectation.findOne({ prof: resultat._id})
  .populate(['prof firstname lastname'])
  .populate('classe', 'name')
  .populate('matiere', 'name')
  .then((data) => {
  
          db.Carnet.findOne({ _id:req.params.id})
          .populate('classe', 'name')
            .populate('matiere', 'name')
            .populate(['prof firstname lastname'])
          
            .then((carnet) => {

              res.render("carnet_de_liaison/carnet_liaison_Prof_Get", { mytitle: "Carnet de liaison", data: data, dataCarnet: carnet, login_info: true, message: req.flash('message') });
            })
        })
      })
    .catch((err) => {
      console.log(err);
    });
  }
  const updateCarnet = (req, res) => {
    let updateCarnet = {
    prof: req.body.idProf,
    title: req.body.title,
    date1:req.body.date1 ,
    date2: req.body.date2,
    classe: req.body.classe,
    matiere:req.body.matiere,
    description:req.body.description ,
    avatar: req.body.avatar ,
   
    dateUpdated: Date.now(),

  }

  let query = { _id: req.body.id }
  console.log(req.body.id );
  db.Carnet.updateOne(query, updateCarnet, (err) => {
      if (!err) {
        console.log('yess');
          res.redirect("/carnetProf")

      } else {
          console.log(err)
      }
  })
    }
module.exports = {
  carnetDirection,
  addCarnetDirection,
  deleteCarnetDirection,
  carnetProf,
  clEleve,
  clParent,
  deleteCarnetProf,
  getCarnet,
  updateCarnet
}