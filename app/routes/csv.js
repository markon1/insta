var mongoose = require("mongoose");
var json2csv = require("json2csv").parse;
var Follow = require("../models/follow");

module.exports = function(app) {
	app.get("/csv", (req, res) => {
		Follow.find({}).exec(function(err, follows) {
			res.attachment("stats.csv");
			res.status(200).send(json2csv(follows));
		});
	});
};
