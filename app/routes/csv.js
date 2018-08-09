var mongoose = require("mongoose");
const Json2csvParser = require("json2csv").Parser;
var Follow = require("../models/follow");
const fields = ["brand", "handle"];

module.exports = function(app) {
	app.get("/csv", (req, res) => {
		Follow.find({}).exec(function(err, follows) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.attachment("stats.csv");
				const json2csvParser = new Json2csvParser({ fields });
				res.status(200).send(json2csvParser.parse(follows));
			}
		});
	});
};
