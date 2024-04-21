const Pantry = require('../models/pantryModel');
const pantryDao = new Pantry();

exports.show_login = function (req, res) {
    res.render("pantry/login");
};

exports.handle_login = function (req, res) {
    res.render("home", {
      user: "user"
    });
};

exports.show_register_page = function (req, res) {
    res.render("pantry/register");
};

exports.post_new_user = function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const postcode = req.body.postcode;
    const telephone = req.body.telephone;
    const password = req.body.password;
  
    if (!name || !email || !address || !postcode || !telephone || !password) {
      res.send(401, "no name, no email, or no password");
      return;
    }

    pantryDao.lookup(email, function (err, u) {
      if (u) {
        res.send(401, "User exists:", email);
        return;
      }

      pantryDao.createPantry(name, email, address, postcode, telephone, password);
    });

    res.redirect('/pantry/pantries');
};

exports.show_pantry_account = function(req, res) {
    res.render('pantry/pantryAccount', {
      user: 'user',
      post: 'post'
    });
};

exports.show_pantry_update = function(req, res) {
    res.render('pantry/updatePantry', {
      user: 'user'
    });
};
  
exports.update_pantry = function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const postcode = req.body.postcode;
    const telephone = req.body.telephone;
    const password = req.body.password;
  
    if (!name || !address || !postcode || !telephone || !password) {
      res.send(401, "missing values");
      return;
    }
  
    pantryDao.updatePantry(name, address, postcode, telephone, password);
    res.redirect("/pantry/pantryAccount");
};

exports.delete_pantry = function(req, res) {
    const userId = req.body.userId;
  
    // Call the deleteUser method from your userModel to delete the user
    pantryDao.deleteUser(userId, (err) => {
        if (err) {
            // Handle error
            console.error("Error deleting user:", err);
            res.status(500).send("Internal server error");
            return;
        }
        // Redirect back to the user database page after deletion
        res.redirect("/pantry/pantries");
    });
};

exports.delete_account = function(req, res) {
    const userId = req.cookie.id;
  
    // Call the deleteUser method from your userModel to delete the user
    pantryDao.deleteUser(userId, (err) => {
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

exports.show_pantries = function (req, res) {
    pantryDao.loadAllPantries()
      .then((list) => {
        res.render("pantry/pantries", {
          users: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
};