const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');



// Classe
const classe = new Schema({
    name: { type: String, required: true, index: { unique: false }, trim: true },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
}
);
const Classe = mongoose.model("Classe", classe);

//Users
const user = new Schema({
    identifiant:[{
        type: String,
    }
    ],



    firstname:String,
    lastname: String,
    username: { type: String, required: true, index: { unique: true }, trim: true },
    type: String,
    gsm: String,
    tel: String,
    adress: String,
    password: String,
    profession: String,
    affectation: { type: Boolean, default: false },
    auth: { type: Boolean, default: false },

    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
}
);
user.plugin(passportLocalMongoose);
const User = mongoose.model("User", user);


// Eleve
const eleve = new Schema({
    firstnameEleve: { type: String, required: false},
    lastnameEleve: { type: String, required: false},
    emailEleve: { type: String, index: { unique: false }},
    adresseEleve: String,
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe'
    },
    dateNaissance: Date,

    firstnamePere: { type: String, trim: true },
    lastnamePere: { type: String, trim: true },
    emailPere: { type: String, index: { unique: true }, trim: true },
    professionPere: String,
    gsmPere: String,

    firstnameMere: String,
    lastnameMere: String,
    emailMere: { type: String, index: { unique: true }, trim: true },
    professioMere: String,
    gsmMere: String,

    emailParent:{ type: String, required: true,index: { unique: false }},

    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
}
);
const Eleve = mongoose.model("Eleve", eleve);




// Matiere
const matiere = new Schema({
    name: { type: String, required: true, index: { unique: false }, trim: true },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
}
);
const Matiere = mongoose.model("Matiere", matiere);





//Carnet de liaison
const carnet = new Schema({
    prof: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    date1: { type: Date },
    date2: { type: Date },
    classe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe'
    }
    ],
    matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere'
    },
    description: String,
    avatar: String,
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
}
);
const Carnet = mongoose.model("Carnet", carnet);


//Affectation
const affectation = new Schema({
    prof: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    classe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe'
    }
    ],
    matiere: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere'
    }
    ],
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
}
);
const Affectation = mongoose.model("Affectation", affectation);


//Autorisation
const autorisation = new Schema({
    title: String,
    date1: { type: Date },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe'
    },
    description: String,
    avatar: String,
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },

}
);
const Autorisation = mongoose.model("Autorisation", autorisation);


module.exports = { Matiere, Classe, Carnet, Affectation, Autorisation, User, Eleve }