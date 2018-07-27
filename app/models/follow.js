// load the things we need
var mongoose = require("mongoose");

// define the schema for our follow model
var followSchema = mongoose.Schema(
	{
		handle: String,
		brand: String
	},
	{ versionKey: false }
);

// create the model for follows and expose it to our app
module.exports = mongoose.model("Follow", followSchema);
