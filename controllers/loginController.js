const db = require("../models/cahier");

const loginGet = (req, res) => {

  const username = req.body.username
  const password = req.body.password
  const authenticate = db.User.authenticate();
  authenticate(username, password, (err, Direction) => {

    res.render("login/sign", { mytitle: "Login", type: "Prof", login_info: false });
    // Value 'result' is set to false. The user could not be authenticated since the user is not active



  })

}

const loginPost = (req, res) => {


    db.User.findOne({ username: req.body.username }, (err, direction) => {
  
      if (direction.auth == false) {
        login = direction.username

        res.redirect('/newPassword');

      } else {
        if (!err) {

          if (direction.type == "Direction") {
            profil = direction.type
            console.log(profil);
            console.log(req.session);
            login = direction.username

            res.redirect('/home');
          }
          if (direction.type == "Profs") {
            profilProf = direction.type
            console.log(profilProf);
            console.log(req.session.passport.user)
            login = direction.username
            res.redirect('/accueilProf');
          }
          if (direction.type == "Parents") {
            profilParent = direction.type
            login = direction.username
            res.redirect('/homeParent');
          }
          if (direction.type == "Elèves") {
            profilEleve = direction.type
            login = direction.username
            res.redirect('/homeEleve');
          }

          // console.log(profil);
          // console.log(profilProf);
        } else {
          console.log(err)
        }
      }
    }
    )
  
}

const newPassword = (req, res) => {

  res.render("login/NewPassword", { mytitle: "Login", type: "Prof", login_info: false, login: login });
}

const newPasswordPost = (req, res) => {

  let password = req.body.password;
  // console.log(password)
  let username = req.body.username;
  // console.log(username)



  db.User.findByUsername(username).then(function (Result) {
    if (Result) {

      Result.setPassword(password, function (err, yes) {

        Result.auth = 'true'
        Result.save();

        res.redirect("/login")
        //  throw 'break'


      });
    }
  })
}

module.exports = {
  loginGet,
  loginPost,
  newPassword,
  newPasswordPost

}