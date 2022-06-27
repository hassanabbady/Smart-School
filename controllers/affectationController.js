const db = require("../models/cahier");


const afficheAffectation = (req, res) => {
  if (profil == "Direction") {
  db.Classe.find()
    .then((result) => {
      db.Matiere.find()
        .then((result1) => {
          db.User.find({ type:'Profs',affectation: 'false' })
            .then((profs) => {


              db.Affectation.find()
                .populate('classe', 'name')
                .populate('matiere', 'name')
              .populate(['prof firstname lastname'])

                .then((affectation) => {




                  res.render("affectation/index", { mytitle: "Affection", dataMatiere: result1, dataClasse: result, dataProf: profs, dataAffectation: affectation, login_info: true });
                })
            })
        })
    })
    .catch((err) => {
      console.log(err);
    });

  }
}
const addAffectation = (req, res) => {
  if (profil == "Direction") {
  const affectation = new db.Affectation(req.body);

  affectation
    .save()
    .then((result) => {
      let updateProf = {

        affectation: 'true',
      }

      let query = { _id: req.body.prof }
      db.User.updateOne(query, updateProf, (err) => {

      })
      res.redirect("/affectation");
    })
    .catch((err) => {
      console.log(err);
    });
  }
}



module.exports = {
  addAffectation,
  afficheAffectation,

}