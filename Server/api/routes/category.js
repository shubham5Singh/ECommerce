const express = require('express');
const router = express.Router();
const category = require('../repositories/category');

router.get('/', (req, res) => {
	category.getAllCategory(function (error, response) {
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

router.get('/:categoryId', (req, res) => {
	const categoryId = req.params.categoryId;
	category.GetOneCategory(categoryId, function (error, response) {
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
					message: 'something is not right',
					error: error
				});
			}
		}
	});
});

router.post('/', (req, res) => {
	category.postCategory(req, function (error, response) {
		if (response != null) {
			res.status(201).json({
				message: 'Row created for the category',
				category: response
			});
		}
		else {
			res.status(500).json({
				message: 'something is not right',
				error: error
			});
		}
	});
});

router.patch('/:categoryId', (req, res) => {
	category.updateCategory(req, function (error, response) {
		if (response != null) {
			res.status(200).json({
				message: response
			});
		}
		else {
			if (error == null) {
				res.status(404).json({
					message: 'NOt found data to update'
				});
			}
			else {
				res.status(500).json({
					message: 'something is not right',
					error: error
				});
			}
		}
	});
});

router.delete('/:categoryId', (req, res) => {
	const categoryId = req.params.categoryId;
	category.deleteCategory(categoryId, function (error, response) {
		if (response != null) {
			res.status(200).json({
				message: response
			});
		}
		else {
			res.status(500).json({
				message: 'something is not right',
				error: error
			});
		}
	});
});

module.exports = router;