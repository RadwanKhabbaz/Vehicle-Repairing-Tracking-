var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../../config.js");
var userRouter = express.Router();

userRouter.use(function(req, res, next) {
  var rawToken = req.get("Authorization")
  var token = rawToken.split("Bearer ")[1];
  jwt.verify(token, config.secret, function(err, decoded) {
    if(err) {
      res.status(500).send({"message": "Err", err: err});
    } else {
      req.body.username = decoded.username;
      req.body.privilage = decoded.privilage;
      next();
    }
  })
});

module.exports = userRouter;
