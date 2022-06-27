const db = require("../models/cahier");


const genererpwdID = (req, res) => {

  console.log(profil)

  if (profil == "Elèves") {
    db.Eleve.findOne({ _id: req.params.id }, (err, parents) => {
      if (!err) {

        res.render("direction/generer_direction", {
          parents: parents, mytitle: "générer Elèves", profil: profil, login_info: true
        })

      } else {
        console.log(err)
      }
    }

    )
  }

  if (profil == "Parents") {
    db.Eleve.findOne({ _id: req.params.id }, (err, parents) => {
      if (!err) {

        res.render("direction/generer_direction", {
          parents: parents, mytitle: "générer parents", profil: profil, login_info: true
        })

      } else {
        console.log(err)
      }
    }

    )
  }
  // if (profil == "Direction") {
  //   db.User.findOne({ _id: req.params.id }, (err, direction) => {
  //     if (!err) {

  //       res.render("direction/generer_direction", {
  //         direction: direction, mytitle: "générer", profil: profil, login_info: true
  //       })

  //     } else {
  //       console.log(err)
  //     }
  //   }

  //   )
  // }
  // if (profilProf == "Profs") {
  //   db.Prof.findOne({ _id: req.params.id }, (err, direction) => {
  //     if (!err) {
  //       res.render("direction/generer_direction", {
  //         direction: direction, mytitle: "générer", profil: profil, login_info: true
  //       })
  //     } else {
  //       console.log(err)
  //     }
  //   }

  //   )
  // }

}
const generer = (req, res) => {
profil = req.param(profil = 'profil');

  if (!profil) {
    profil = "Parents"

  }

  // if (profil == "Direction") {
  //   db.User.find({type:profil})
  //     .then((result) => {
  //       res.render("direction/generer", { mytitle: "générer les mot de passe", dataDirection: result, profil: profil, login_info: true });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // }
  // if (profil == "Profs") {
  //   db.User.find({type:profil})
  //     .then((result) => {
  //       res.render("direction/generer", { mytitle: "générer les mot de passe", dataDirection: result, profil: profil, login_info: true });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // }
  if (profil == "Parents") {
    db.Eleve.find()
      .then((result) => {
        res.render("direction/generer", { mytitle: "générer les mot de passe", dataDirection: result, profil: profil, login_info: true });
      })
      .catch((err) => {
        console.log(err);
      });

  }
  if (profil == "Elèves") {
    db.Eleve.find()
      .then((result) => {
        res.render("direction/generer", { mytitle: "générer les mot de passe", dataDirection: result, profil: profil, login_info: true });
      })
      .catch((err) => {
        console.log(err);
      });

  }

}



const genererPost = (req, res) => {

  let password = req.body.password;
  // console.log(password)
  let username = req.body.username;
  console.log(username)


  console.log(profil);
  db.User.findOne({ username: username, type: profil }).then(function (Result) {
    console.log(Result);
    if (Result) {

      Result.setPassword(password, function (err, yes) {
        Result.auth = false
        Result.identifiant.push(req.body.id);
        Result.dateUpdated = Date.now(),
          Result.save();

        res.redirect("/generer")
        //  throw 'break'


      });
    } else {
      db.User.register({

        identifiant: [req.body.id],
       firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: username, active: false,
        type: profil,
      }, password, function (err, user) {
        res.redirect("/generer")
        console.log("registered")
        if (err) {
          console.log(err)


        }

      })
    }
  }, function (err) {
    console.error(err)
  })


}

const genererTout = (req, res) => {

  let password = req.body.password;
  // console.log(password)


  db.User.find({ type: profil }).then(function (Results) {

    Results.forEach(function (Result) {
      Result.setPassword(password, function (err, yes) {
        Result.dateUpdated = Date.now(),
          Result.auth = false
        Result.save();
      })
    })
    res.redirect("/generer")
  })


}




module.exports = {
  generer,
  genererpwdID,
  genererPost,
  genererTout
}