var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../../config.js");
var clientRouter = express.Router();

clientRouter.use(function(req, res, next) {
  if(req.body.privilage == "client") {
    next();
  } else {
    res.status(403).send({"message": "Must be client"});
  }
});

module.exports = clientRouter;
