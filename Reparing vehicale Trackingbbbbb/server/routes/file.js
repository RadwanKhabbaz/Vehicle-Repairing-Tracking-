var express = require("express");
var fileRouter = express.Router();

fileRouter.get("/", function(req, res) {
  res.render("index.html");
});

module.exports = fileRouter;
