const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const user = new userModel;
const adminModel = require('../models/adminModel');
const admin = new adminModel;
const pantryModel = require('../models/pantryModel');
const pantry = new pantryModel;

//User login
exports.user_login = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  user.lookup(email, function (err, user) {
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send();
    }
    if (!user) {
      console.log("user ", email, " not found");
      return res.render("register");
    }
    console.log(user)
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      console.log(result)
      if (result) {
        //use the payload to store information about the user such as username.
        let payload = { name: user.name, email: user.email, role: user.role, id: user._id };
        //create the access token 
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 300}); 
        res.cookie("jwt", accessToken);
        next();
      } else {
        return res.render("login");
      }
    });
  });
};

//Admin login
exports.admin_login = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  admin.lookup(email, function (err, user) {
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send();
    }
    if (!user) {
      console.log("user ", email, " not found");
      return res.render("admin/login");
    }
    console.log(user)
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      console.log(result)
      if (result) {
        //use the payload to store information about the user such as username.
        let payload = { name: user.name, email: user.email, role: user.role, id: user._id };
        //create the access token 
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 300}); 
        res.cookie("jwt", accessToken);
        next();
      } else {
        return res.render("admin/login");
      }
    });
  });
};

//Pantry login
exports.pantry_login = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  pantry.lookup(email, function (err, user) {
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send();
    }
    if (!user) {
      console.log("user ", email, " not found");
      return res.render("pantry/login");
    }
    console.log(user)
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      console.log(result)
      if (result) {
        //use the payload to store information about the user such as username.
        let payload = { name: user.name, email: user.email, role: user.role, id: user._id };
        //create the access token 
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 300}); 
        res.cookie("jwt", accessToken);
        next();
      } else {
        return res.render("pantry/login");
      }
    });
  });
};

exports.verify = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  if (!accessToken) {
    return res.status(403).send();
  }
  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};

exports.verifyAdmin = function (req, res, next) 
{
  let accessToken = req.cookies.jwt;
  let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (payload.role != "admin") 
  {
    return res.status(403).send();
  }

  try 
  {
    next();
  } 
  catch (e) 
  {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};

exports.verifyPantry = function (req, res, next) 
{
  let accessToken = req.cookies.jwt;
  let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  console.log(payload.role);

  if (payload.role != "admin" && payload.role != "pantry") 
  {
    return res.status(403).send();
  }

  try 
  {
    next();
  } 
  catch (e) 
  {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};

exports.verifyUser = function (req, res, next) 
{
  let accessToken = req.cookies.jwt;
  let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (payload.role != "admin" && payload.role != "user") 
  {
    return res.status(403).send();
  }

  try 
  {
    next();
  } 
  catch (e) 
  {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};