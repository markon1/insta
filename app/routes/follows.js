var mongoose = require("mongoose");
var Follow = require("../models/follow");

module.exports = function(app) {
	app.use("/follows/:followID", (req, res, next) => {
		Follow.findById(req.params.followID, (err, follow) => {
			if (err) res.status(500).send(err);
			else {
				req.follow = follow;
				next();
			}
		});
	});

	app.route("/follows")
		.get((req, res) => {
			let query = {};

			if (req.query.handle && req.query.brand) {
				query.handle = req.query.handle;
				query.brand = req.query.brand;
			}

			Follow.find(query).exec(function(err, follows) {
				res.json(follows);
			});
		})
		.post((req, res) => {
			let foll = new Follow(req.body);

			Follow.findOne({ handle: foll.handle, brand: foll.brand }).exec(function(err, foundFollow) {
				if (!foundFollow) {
					foll.save();
					res.json(foll);
				} else {
					res.status("409").end({ error: "User with handle: " + foll.handle + " already exists in brand: " + foll.brand + " database." });
				}
			});
		});

	app.route("/follows/:followID")
		.get((req, res) => {
			res.json(req.follow);
		})
		.patch((req, res) => {
			for (let p in req.body) {
				req.follow[p] = req.body[p];
			}

			if (req.follow.__v != null) {
				delete req.follow.__v;
			}
			req.follow.save();
			res.json(req.follow);
		})
		.delete((req, res) => {
			req.follow.remove(err => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(204).send("removed");
				}
			});
		});
};
