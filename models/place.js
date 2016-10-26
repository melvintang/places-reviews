var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
						name: {
							type: String,
							required: true
						},
						address: String,
						city: String,
						state: String,
						phone: String
						// reviews: [{
						// 	type: mongoose.Schema.Types.ObjectId,
						// 	ref: "Review"
						// }]
					});

var Place = mongoose.model("Place", placeSchema);

module.exports = Place;
