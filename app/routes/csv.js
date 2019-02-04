var mongoose = require("mongoose");
const fs = require('fs');
const path = require('path')
const Json2csvParser = require("json2csv").Parser;
var Follow = require("../models/follow");
const fields = ["brand", "handle", "title", "followDateTime", "posts", "followers", "following", "description", "link", "isPrivate"];

module.exports = function(app) {
	app.get("/csv", (req, res) => {
		Follow.find({}).exec(function(err, follows) {
			if (err) {
				res.status(500).send(err);
			} else {
				let csv;
				try {
					const json2csvParser = new Json2csvParser({ fields });					
					csv = json2csvParser.parse(follows);
				} catch (err) {
					return res.status(500).json({ err });
				}
				const dateTime = Date.now();
				const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv");
				  
				fs.writeFile(filePath, csv, function (err) {
					if (err) {
					  return res.json(err).status(500);
					}
					else {
					  setTimeout(function () {
						fs.unlinkSync(filePath); // delete this file after 30 seconds
					  }, 30000)
					  return res.json("/exports/csv-" + dateTime + ".csv");
					}
				  });
			}
		});
	});
};
