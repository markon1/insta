var mongoose = require("mongoose");
const Json2csvParser = require("json2csv").Parser;
var Follow = require("../models/follow");
const fields = ["brand", "handle", "title", "followDateTime", "posts", "followers", "following", "description", "link", "isPrivate"];

module.exports = function(app) {
	app.get("/csv", (req, res) => {
		if (req.query.from && req.query.to) {
			let objIdMin = mongoose.Types.ObjectId(Math.floor(new Date(req.query.from) / 1000).toString(16) + "0000000000000000");
			let objIdMax = mongoose.Types.ObjectId(Math.floor(new Date(req.query.to) / 1000).toString(16) + "0000000000000000");

			Follow.find({ _id: { $gt: objIdMin, $lt: objIdMax } }).exec(function(err, follows) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.attachment("stats.csv");
					const json2csvParser = new Json2csvParser({ fields });
					res.status(200).send(json2csvParser.parse(follows));
				}
			});
		}
	});
};
