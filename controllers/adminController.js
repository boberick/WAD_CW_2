const Admin = require('../models/adminModel');
const adminDao = new Admin();

exports.show_login = function (req, res) {
    res.render("admin/login");
};

exports.handle_login = function (req, res) {
    res.render("home", {
      user: "user"
    });
};

exports.show_register_page = function (req, res) {
    res.render("admin/register");
};
  
exports.post_new_user = function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    if (!name || !email || !password) {
      res.send(401, "no name, no email, or no password");
      return;
    }

    adminDao.lookup(email, function (err, u) {
      if (u) {
        res.send(401, "User exists:", email);
        return;
      }

      adminDao.createAdmin(name, email, password);
    });

    res.redirect('/admin/admins');
};

exports.show_admin_account = function(req, res) {
    res.render('admin/adminAccount', {
      user: 'user',
    });
};

exports.show_admin_update = function(req, res) {
    res.render('admin/updateAdmin', {
      user: 'user'
    });
};
  
exports.update_admin = function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
  
    if (!name || !password) {
      res.send(401, "no name, no email, or no password");
      return;
    }
  
    adminDao.updateAdmin(name, password);
    res.redirect("admin/adminAccount");
};

exports.delete_admin = function(req, res) {
    const userId = req.body.userId;
  
    // Call the deleteUser method from your userModel to delete the user
    adminDao.deleteAdmin(userId, (err) => {
        if (err) {
            // Handle error
            console.error("Error deleting user:", err);
            res.status(500).send("Internal server error");
            return;
        }
        // Redirect back to the user database page after deletion
        res.redirect("admin/admins");
    });
};

exports.delete_account = function(req, res) {
    const userId = req.cookie.id;
  
    // Call the deleteUser method from your userModel to delete the user
    adminDao.deleteAdmin(userId, (err) => {
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

exports.show_admins = function (req, res) {
    adminDao.loadAllAdmins()
      .then((list) => {
        res.render("admin/admins", {
          users: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
};