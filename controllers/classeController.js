const db = require("../models/cahier");


const afficheClasse = (req, res) => {
    db.Classe.find()
        .then((result) => {
            res.render("classe/add_classe", { mytitle: "Classe", dataClasse: result, login_info: true, message: req.flash('message'), type: req.flash('type') });
        })
        .catch((err) => {
            console.log(err);
        });

}
const addClasse = (req, res) => {
    db.Classe.findOne({ name: req.body.name })
        .then((result) => {
            if (result) {
                req.flash('type', 'alert alert-danger');
                req.flash('message', 'Classe deja enregistree');
                res.redirect("/classe");
            } else {
                const classe = new db.Classe(req.body);
                classe
                    .save()
                    .then((result) => {
                        req.flash('type', 'alert alert-success');
                        req.flash('message', 'Classe enregistree');
                        res.redirect("/classe");
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



const deleteClasse = (req, res) => {
    console.log(req.flash)

    db.Classe.findByIdAndRemove(req.params.id)
        .then((result) => {
            req.flash('type', 'alert alert-danger');
            req.flash('message', 'Classe supprimé');
            res.redirect("/classe");
        })
        .catch((err) => {
            console.log(err);
        });

}


const updateClasseId = (req, res) => {
    db.Classe.findOne({ _id: req.params.id }, (err, classe) => {
        if (!err) {
            db.Classe.find()
                .then((result) => {
                    // res.render("matiere/add_matiere", { mytitle: "Matiere", dataMatiere: result  ,login_info:true});
                    res.render("classe/update_classe", {
                        classe: classe, mytitle: "Modifier classe", login_info: true, dataClasse: result, message: req.flash('message')
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
const updateClasse = (req, res) => {
    let updateClasse = {
        name: req.body.name,
        dateUpdated: Date.now(),

    }

    let query = { _id: req.body.id }
    db.Classe.updateOne(query, updateClasse, (err) => {
        if (!err) {
            req.flash('type', 'alert alert-info');
            req.flash('message', 'Classe modifié');
            res.redirect("/classe")

        } else {
            console.log(err)
        }
    })

}

module.exports = {
    afficheClasse,
    addClasse,
    deleteClasse,
    updateClasse,
    updateClasseId
}