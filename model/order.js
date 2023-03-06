const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: {
		type: String,
		ref: "Product",
		require: true,
	},
	quantity: {
		type: Number,
		default: 1,
	},
});
module.exports = new mongoose.model("Order", orderScheme);
