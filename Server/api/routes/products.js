const express = require('express');
const router = express.Router();
const sql = require('mssql');
const productRepo = require('../repositories/product');

sql.close();
router.get('/', (req, res) => {
	productRepo.getAllProduct(function (error, response) {
		if (response != null) {
			res.status(200).json({
				data: response
			});
		}
		else {
			if (error == null) {
				res.status(404).json({
					message: 'No record found'
				});
			}
			else {
				res.status(500).json({
					err: error
				});
			}
		}
	});

});

router.post('/', (req, res) => {
	productRepo.createProduct(req, function (error, response) {
		if (response != null) {
			res.status(201).json({
				message: response
			});
		}
		else {
			res.status(500).json({
				error: error
			});
		}
	});
});

router.get('/:productId', (req, res) => {
	const id = req.params.productId;
	productRepo.getProductDetail(id, function (error, response) {
		if (response != null) {
			res.status(200).json({
				data: response
			});
		}
		else {
			if (error == null) {
				res.status(404).json({
					message: 'No record found'
				});
			}
			else {
				res.status(500).json({
					error: error
				});
			}
		}
	});

});

router.patch('/:productId', (req, res) => {
	const productId = req.params.productId;
	productRepo.updateProduct(productId,req, function (error, response) {
		if (response != null) {
			res.status(200).json({
				message: response
			});
		}
		else {
			res.status(500).json({
				error: error
			});
		}
	});
});

router.delete('/:productId', (req, res) => {
	const productId = req.params.productId;
	productRepo.deleteProduct(productId, function (error, response) {
		if (response != null) {
			res.status(200).json({
				message: response
			});
		}
		else {
			res.status(500).json({
				error: error
			});
		}
	});
});

module.exports = router;