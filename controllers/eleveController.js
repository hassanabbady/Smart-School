const db = require("../models/cahier");


const afficheEleve = (req, res) => {
  db.Classe.find()
    .then((classes) => {
      // res.render("classe/add_classe", { mytitle: "Classe", dataClasse: result, login_info: true, message: req.flash('message'), type: req.flash('type') });
      db.Eleve.find()
        .populate('classe', 'name')
        .then((dataEleve) => {
          // res.render("classe/add_classe", { mytitle: "Classe", dataClasse: result, login_info: true, message: req.flash('message'), type: req.flash('type') });

          res.render("eleve/add_eleve", { mytitle: "Eleve", classes: classes, dataEleve: dataEleve, login_info: true });
        })
        .catch((err) => {
          console.log(err);
        });
      //res.render("eleve/add_eleve", { mytitle: "Eleve", classes: classes, login_info: true });
    })
    .catch((err) => {
      console.log(err);
    });

}

const addEleve = (req, res) => {

if (profil == "Direction") {

    const eleves = new db.Eleve({
      //////Eleve
      firstnameEleve: req.body.nomEleve,
      lastnameEleve: req.body.prenomEleve,
      emailEleve: req.body.emailEleve,
      adresseEleve: req.body.adressEleve,
      dateNaissance: req.body.dateNaissanceEleve,
      classe: req.body.classe,
      //////Fin Eleve

      //////Pere
      // firstnamePere: req.body.nomPere,
      // lastnamePere: req.body.prenomPere,
      // emailPere: req.body.emailPere,
      // professionPere: req.body.professionPere,
      // gsmPere: req.body.gsmPere,
      //////Fin Pere

      //////MerM
      // firstnameMere: req.body.nomMere,
      // lastnameMere: req.body.prenomMere,
      // emailMere: req.body.emailMere,
      // professionMere: req.body.professionMere,
      // gsmMere: req.body.gsmMere,
      //////Fin Mere
      emailParent: req.body.emailParent
    });


    // const facture = new FactureModel.FactureSchema(req.body);

    // facture
    eleves
      .save()
      .then((data) => {

        res.redirect("/eleve");
      })
      .catch((err) => {
        console.log(err);
      });
   }
}

const homeEleve = (req, res) => {
  if (profilEleve == "Elèves") {
    res.render("eleve/homeEleve", { mytitle: "Eleve", login_info: true });
  }
  else {
    res.redirect("/")
  }

}
const homeParent = (req, res) => {
  if (profilParent == "Parents") {
    res.render("eleve/homeParent", { mytitle: "Parent", login_info: true });
  }
  else {
    res.redirect("/")
  }

}




module.exports = {
  afficheEleve,
  addEleve,
  homeEleve,
  homeParent
  

}