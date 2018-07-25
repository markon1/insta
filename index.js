// get all the tools we need
var express = require("express");
var mongoose = require("mongoose");

// init express
var app = express();
// set the port of app
var port = process.env.PORT || 8080;

app.listen(port);
console.log("The magic happens on port " + port);
