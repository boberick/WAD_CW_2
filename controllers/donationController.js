const Donation = require('../models/donationModel');
const donationDao = new Donation();
const jwt = require('jsonwebtoken');

exports.make_donation = function(req, res) {
    res.render('donation/makeDonation', {
        user: 'user'
    });
};

exports.create_donation = function(req, res) {
  const token = req.cookies.jwt;
  console.log(req.body);

  // Verify and decode the token to get user information
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      console.error('Error verifying JWT:', err);
      res.redirect('/login');
    } else {
      const { name, email, id } = decodedToken;

      const harvestDate = req.body.harvestDate;
      const description = req.body.description;

      console.log(harvestDate);
      console.log(description);

      donationDao.createDonation(harvestDate, description, name, email, id);
      res.redirect('/donation/donate');
    }
  });
};

exports.donation_update = function(req, res) {
    res.render('donation/updateDonation', {
        user: 'user'
    });
};

exports.update_donation = function(req, res) {
    const harvestDate = req.body.harvestDate;
    const description = req.body.description;
    
    if (!harvestDate || !description) {
        res.send(401, "no harvest date or description");
        return;
    }

    donationDao.updateDonation(harvestDate, description);
    res.redirect('/user/userAccount');
};

exports.display_donation = function(req, res) {
  let donationId = req.body.donationId;
  console.log("Donation ID:", donationId);
  
  donationDao.getDonation(donationId)
      .then((entry) => {
          console.log("Retrieved entry:", entry);
          res.render("donation/showDonation", {
              user: "user",
              entry: entry,
          });
      })
      .catch((err) => {
          console.log("Error:", err);
          res.status(500).send("Error fetching donation");
      });
}

exports.show_all_donations = function (req, res) {
    donationDao.deleteExpired()
    
    donationDao.getAllDonations()
      .then((list) => {
        res.render("donation/donations", {
          title: 'Donations',
          user: "user",
          entries: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
};

exports.show_user_donations = function (req, res) {
    let user = req.params.authorId;
    console.log('user: ', user);
    donationDao.getDonationsByUser(user)
      .then((entries) => {
        res.render("donation/donations", {
          user: "user",
          entries: entries,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
    });
};

exports.delete_donation = function(req, res) {
  const donationId = req.body.donationId;

  donationDao.deleteDonation(donationId, (err) => {
      if (err) {
          console.error("Error deleting user:", err);
          res.status(500).send("Internal server error");
          return;
      }
  });

  res.redirect("/donation/all");
};

exports.make_claim = function(req, res) {
  const token = req.cookies.jwt;
  console.log(req.body);

  // Verify and decode the token to get user information
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      console.error('Error verifying JWT:', err);
      res.redirect('/login');
    } else {
      const { name, email, id } = decodedToken;
      const harvestDate = req.body.harvestDate;
      const description = req.body.description;
      const author = req.body.author;
      const authorId = req.body.authorId;
      const publishedDate = req.body.publishedDate;
      const donationId = req.body.donationId;

      donationDao.claimDonation(harvestDate, description, author, email,  authorId, publishedDate, donationId, name, id);
      
      donationDao.deleteDonation(donationId, (err) => {
        if (err) {
            console.error("Error deleting user:", err);
            res.status(500).send("Internal server error");
            return;
        }
      });

      res.redirect('/donation/all');
    }
  });
};

exports.show_all_claimed = function(req, res){
  donationDao.showAllClaimed()
      .then((list) => {
        res.render("donation/claimed", {
          title: 'Claimed Donations',
          user: "user",
          entries: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
}

exports.show_pantry_claimed = function(req, res){
  let user = req.params.pantryId;
    console.log('user: ', user);
    donationDao.getDonationsByUser(user)
      .then((entries) => {
        res.render("pantry/pantryAccount", {
          user: "user",
          entries: entries,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
    });
}
