const Public = require('../models/publicModel');
const publicDao = new Public();
const User = require('../models/userModel');
const userDao = new User();

exports.landing_page = function (req, res) {
    res.render('home');
};

exports.about_page = function (req, res) {
    res.render('about');
}

exports.contact_page = function (req, res) {
    res.render('contact');
}

exports.submit_message = function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!name || !email || !message) {
    res.send(401, "no name, no email, or no message");
    return;
  }

  publicDao.addMessage(name, email, message);
  res.redirect("/");
}

exports.show_messages = function(req, res){
  publicDao.loadAllMessages()
    .then((list) => {
      res.render("messages", {
        posts: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
}

exports.delete_message = function(req, res){
  const messageId = req.body.messageId;

  publicDao.deleteMessage(messageId, (err) => {
    if (err) {
      // Handle error
      console.error("Error deleting user:", err);
      res.status(500).send("Internal server error");
      return;
    }
  });
  res.redirect("messages");
}

exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
};

//Login

exports.show_login = function (req, res) {
    res.render("login");
};

exports.handle_login = function (req, res) {
    res.render("home", {
      user: "user"
    });
};

//Register

exports.show_register_page = function (req, res) {
    res.render("register");
};
  
exports.post_new_user = function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    if (!name || !email || !password) {
      res.send(401, "no name, no email, or no password");
      return;
    }

    userDao.lookup(email, function (err, u) {
      if (u) {
        res.send(401, "User exists:", email);
        return;
      }

      userDao.createUser(name, email, password);
      res.redirect("/login");
    });
};