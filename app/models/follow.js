// load the things we need
var mongoose = require("mongoose");

// define the schema for our follow model
var followSchema = mongoose.Schema(
	{
		handle: String,
		brand: String,
		title: { type: String, default: "" },
		followDateTime: { type: String, default: "" },
		posts: { type: String, default: "" },
		followers: { type: String, default: "" },
		following: { type: String, default: "" },
		description: { type: String, default: "" },
		link: { type: String, default: "" },
		isPrivate: { type: String, default: "" }
	},
	{ versionKey: false }
);

// create the model for follows and expose it to our app
module.exports = mongoose.model("Follow", followSchema);
