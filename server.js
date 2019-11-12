// get all the tools we need
var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var configDB = require("./app/config/database.js");

// init express
var app = express();
// set the port of app
var port = process.env.PORT || 8080;
// connect to our database
mongoose.connect(configDB.url,{ useUnifiedTopology: true });

// log every request to the console
app.use(morgan("dev"));
// use bodyParser
app.use(bodyParser());
// set up ejs for templating
app.set("view engine", "ejs");
// set route
require("./app/routes/follows.js")(app);
require("./app/routes/csv.js")(app);
//set public dir
app.use(express.static('public'));

let server = app.listen(port);
server.timeout = 60000;

console.log("The magic happens on port " + port);
