
let profil;
let profilProf;
let profilParent;
let profilEleve;

const express = require("express");
const bodyParser = require('body-parser'); // parser middleware
const cors = require('cors');
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization
const flash = require('connect-flash');
const db = require("./models/cahier");
const app = express();
app.use(flash());
const multer = require('multer')
const allProfsRouter = require('./routes/all-profs')
const allDirectionRouter = require('./routes/all-direction')
const allLoginRouter = require('./routes/all-login')
const allClasseRouter = require('./routes/all-classe')
const allMatiereRouter = require('./routes/all-matiere')
const allPasswordRouter = require('./routes/all-password')
const allCarnetRouter = require('./routes/all-carnet')
const allAffectationRouter = require('./routes/all-affectation')
const allEleveRouter = require('./routes/all-eleve')
const port = 3000;
///////////////////////////////////////////////////////////////////////////////////////////

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Configure More Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
console.log(app.locals.env);

// Passport Local Strategy
passport.use(db.User.createStrategy());

// To use with sessions
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

//////////////////////////////////////////////////////////////////////////////////////////////////
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// mongoose
const  mongoose = require("mongoose");
//mongodb://localhost/ArretBilan
//mongodb+srv://hassan:1234@cluster0.egy9i.mongodb.net/smartschool?retryWrites=true&w=majority
const cnx = async()=>{
await mongoose
  .connect(
    'mongodb+srv://hassan:1234@cluster0.egy9i.mongodb.net/smartschool?retryWrites=true&w=majority',  {


    
  })
  .then((result) => {
     app.listen(process.env.PORT || port, () =>  {
      console.log(`Example app e listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {

    console.log(err);
  });
}
cnx()
// Debut Home
app.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("index", { mytitle: "Smart School", login_info: true });
  
});
// Fin Home

// Debut Login
app.use('/', allLoginRouter)

// Fin Login

// Debut Direction
app.use('/', connectEnsureLogin.ensureLoggedIn(), allDirectionRouter)
// Fin Direction

// Debut Professeurs
app.use('/', connectEnsureLogin.ensureLoggedIn(), allProfsRouter)
// Fin Professeurs

// Debut Eleve
app.use('/', connectEnsureLogin.ensureLoggedIn(), allEleveRouter)
// Fin Eleve

// Debut Classes
app.use('/', connectEnsureLogin.ensureLoggedIn(), allClasseRouter)
// Fin Classes

// Debut Matiere
app.use('/', connectEnsureLogin.ensureLoggedIn(), allMatiereRouter)
// Fin Matiere

// Debut password
app.use('/', connectEnsureLogin.ensureLoggedIn(), allPasswordRouter)
// Fin password

// Debut carnet
app.use('/', connectEnsureLogin.ensureLoggedIn(), allCarnetRouter)
// Fin carnet

// Debut Affectation
app.use('/', connectEnsureLogin.ensureLoggedIn(), allAffectationRouter)
// Fin Affectation


// ** Début Logout ** 
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});
// Fin Logout

app.use((req, res) => {
  res.status(404).render("404", { mytitle: "404", login_info: true });
});
