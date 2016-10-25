var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
						name: {
							type: String,
							required: true
						},
						address: String,
						city: String,
						state: String,
						phone: Number
						// reviews: [{
						// 	type: mongoose.Schema.Types.ObjectId,
						// 	ref: "Review"
						// }]
					});

var Place = mongoose.model("Place", placeSchema);

module.exports = Place;
