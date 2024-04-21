const User = require('../models/userModel');
const userDao = new User();

exports.show_user_account = function(req, res) {
  res.render('user/userAccount', {
    user: 'user',
    post: 'post'
  });
}

exports.show_user_update = function(req, res) {
  res.render('user/updateUser', {
    user: 'user'
  });
}

exports.update_user = function (req, res) {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    res.send(401, "no name, no email, or no password");
    return;
  }

  userDao.updateUser(name, password);
  res.redirect("/user/userAccount");
};

exports.delete_user = function(req, res) {
  const userId = req.body.userId;

  // Call the deleteUser method from your userModel to delete the user
  userDao.deleteUser(userId, (err) => {
      if (err) {
          // Handle error
          console.error("Error deleting user:", err);
          res.status(500).send("Internal server error");
          return;
      }
      // Redirect back to the user database page after deletion
      res.redirect("/user/users");
  });
};

exports.delete_account = function(req, res) {
  const userId = req.cookie.id;

  // Call the deleteUser method from your userModel to delete the user
  userDao.deleteUser(userId, (err) => {
      if (err) {
          // Handle error
          console.error("Error deleting user:", err);
          res.status(500).send("Internal server error");
          return;
      }
      // Redirect back to the homepage after deletion
      res.clearCookie("jwt").status(200).redirect("/");
  });
};

exports.show_users = function (req, res) {
  userDao.loadAllUsers()
    .then((list) => {
      res.render("user/users", {
        users: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};