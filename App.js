const express = require("express");
const app = express();

// external (npm libraries ) middlewares
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));

mongoose.connect(`mongodb://localhost:27017/every_T_Shirt`);
// External Routers.

const productRouter = require("./router/producst");
const orderRouter = require("./router/order");

app.use("/product", productRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Its now working",
	});
});

// Error handling

app.use((req, res, next) => {
	const error = new Error("Endpoint not found");
	next(error);
});

app.use((error, req, res, next) => {
	// handles error
});

module.exports = app;
