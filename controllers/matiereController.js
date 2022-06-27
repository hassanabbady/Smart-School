const db = require("../models/cahier");


const afficheMatiere = (req, res) => {
  db.Matiere.find()
    .then((result) => {
      res.render("matiere/add_matiere", { mytitle: "Matiere", dataMatiere: result  ,login_info:true,message: req.flash('message'), type: req.flash('type')});
    })
    .catch((err) => {
      console.log(err);
    });

}

const addMatiere = (req, res) => {
  db.Matiere.findOne({ name: req.body.name })
  .then((result) => {
    if (result) {
      req.flash('type', 'alert alert-danger');
      req.flash('message', 'Matiere deja enregistree');
      res.redirect("/matiere");
  } else {
    const matiere = new db.Matiere(req.body);

    matiere
      .save()
      .then((result) => {
        req.flash('type', 'alert alert-success');
        req.flash('message', 'Matiere enregistree');
      
        res.redirect("/matiere");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  })
  .catch((err) => {
    console.log(err);
  });
  
}

const updateMatiereId = (req, res) => {
  db.Matiere.findOne({ _id: req.params.id }, (err, matiere) => {
      if (!err) {
        db.Matiere.find()
        .then((result) => {
          // res.render("matiere/add_matiere", { mytitle: "Matiere", dataMatiere: result  ,login_info:true});
          res.render("matiere/update_matiere", {
            matiere: matiere, mytitle: "Modifier matiere", login_info: true,dataMatiere: result,message: req.flash('message')
        })
        })
        .catch((err) => {
          console.log(err);
        });
         
      } else {
          console.log(err)
      }
  }

  )
}
const updateMatiere = (req, res) => {
  let updateMatiere = {
      name: req.body.name,
      dateUpdated:Date.now(),
    
  }

  let query = { _id: req.body.id }
  db.Matiere.updateOne(query, updateMatiere, (err) => {
      if (!err) {
        req.flash('type', 'alert alert-warning');
          req.flash('message', 'Matiere modifié');
          res.redirect("/matiere")

      } else {
          console.log(err)
      }
  })

}


const deleteMatiere = (req, res) => {


  db.Matiere.findByIdAndRemove(req.params.id)
    .then((result) => {
      req.flash('type', 'alert alert-danger');
      req.flash('message', 'Matiere supprimé');
      res.redirect("/matiere");
    })
    .catch((err) => {
      console.log(err);
    });

}
module.exports = {
  afficheMatiere,
  addMatiere,
  deleteMatiere,
  updateMatiereId,
  updateMatiere
}