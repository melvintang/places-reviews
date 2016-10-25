var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({

						title: {
							type: String,
							required: true
						},
						comments: {
							type: String,
							required: true
						},

						rating: {
							type: Number,
							required: true
						},

						postDate: {
							type: Date,
							default: Date.now
						},

						user_id: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "User"
						},

						place_id: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "Place"
						}
					});

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
