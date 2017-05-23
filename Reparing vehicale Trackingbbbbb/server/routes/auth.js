var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../config.js");
var authRouter = express.Router();

//import models
var User = require("../models/user.js");

//signup
authRouter.post("/signup", function(req, res) {
  //If the username is already taken
  //If not then add the user
  User.find({username: req.body.username}, function(err, data) {
    if(err) {
      res.status(500).send({"message": "Error", err: err});
    } else if(data.length > 0) {
      res.status(409).send({"message": "Username is taken"});
    } else {
      var newUser = new User(req.body);
      newUser.save(function(err, data) {
        if(err) {
          res.status(500).send({"message": "Error", err: err});
        } else {
          res.status(200).send({"message": "You just signed up for an account", data: data});
        }
      });
    }
  });
});

//signin
authRouter.post("/signin", function(req, res) {
  //if someone with the username exists
  //if the password mathces
  User.findOne({username: req.body.username}, function(err, data) {
    console.log(data);
    if(err) {
      res.status(500).send({"message": "Error", err: err});
    } else if(data === null) {
      res.status(404).send({"message": "Username does not exist"});
    } else if(data.password != req.body.password) {
      res.status(403).send({"message": "Passwords did not match"});
    } else {
      //send the json web token
      var token = jwt.sign(data.toObject(), config.secret, {"expiresIn": "1h"});
      res.status(200).send({"message": "Here is your token sir", token: token, priv: data.privilage});
    }
  });
});

module.exports = authRouter;

