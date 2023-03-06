const express = require("express");
const router = require("express").Router();
const Product = require("../model/product");
const mongoose = require("mongoose");

const baseUrl = "http://localhost:3501/product/";

router.get("/", (req, res) => {
	Product.find()
		.then((result) => {
			const products = result.map((product) => {
				return {
					_id: product._id,
					name: product.name,
					price: product.price,
					resource: {
						method: "GET",
						url: baseUrl + product._id,
					},
				};
			});
			res.json(products);
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});

router.get("/:productId", (req, res) => {
	let id = req.params.productId;
	Product.findById(id)
		.then((result) => {
			if (result != null) {
				res.status(200).json(result);
			} else {
				res.status(404).json({
					message: "Item not found",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

router.patch("/:productId", (req, res) => {
	let id = req.params.productId;
	Product.updateOne(
		{ _id: id },
		{
			name: req.body.name,
			price: req.body.price,
		}
	)
		.then(() => {
			res.status(200).json({
				_id: id,
				name: req.body.name,
				price: req.body.price,
				resource: {
					methon: "GET",
					url: baseUrl + id,
				},
			});
		})
		.catch(() => {
			res.send("An error occured");
		});
});

router.post("/", (req, res) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
	});

	product
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
});

router.delete("/:productId", (req, res) => {
	let id = req.params.productId;
	Product.deleteOne({ _id: id })
		.then(() => {
			res.json({ message: "Deleted" });
		})
		.catch((err) => {
			res.json({ error: err });
		});
});

module.exports = router;
