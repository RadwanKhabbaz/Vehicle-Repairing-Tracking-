var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../../config.js");
var employeeRouter = express.Router();

employeeRouter.use(function(req, res, next) {
  if(req.body.privilage == "employee") {
    next();
  } else {
    res.status(403).send({"message": "Must be employee"});
  }
});

module.exports = employeeRouter;
