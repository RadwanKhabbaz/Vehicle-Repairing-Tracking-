var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var path = require("path");
var expressJwt = require("express-jwt");

//import config
var config = require("./config.js");

//get port number
var port = process.env.Port || 8080;

//setup mongoose connection
mongoose.connect("mongodb://localhost/repairingtracking");

//setup base express app
var app = express();

//setup app to handle json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setup static files
app.use(express.static(path.join(__dirname + "/../public")));
app.set("views", __dirname + "/../public");

//setup server to handle html
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

//import routes
var apiRouter = require("./routes/api.js");
var fileRouter = require("./routes/file.js");
var authRouter = require("./routes/auth.js");
var subRout=require("./routes/SubRoute.js");
app.use("/contact",subRout);

app.use("/api", expressJwt({"secret": config.secret}));

app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/", fileRouter);

app.listen(port, function() {
  console.log("It's work to run server repairing car tracking listening on port " + port);
});
