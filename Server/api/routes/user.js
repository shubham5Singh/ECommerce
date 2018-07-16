const express = require('express');
const router = express.Router();
const user = require('../repositories/user');

router.get('/', (req, res) => {
	user.getUser(function (error, response) {
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

router.post('/', (req, res) => {
	user.postUser(req, function (error, response) {
		if (response != null) {
			res.status(201).json({
				message: 'Row created for the user',
				user: response
			});
		}
		else {
			if (error == null) {
				res.status(400).json({
					message: 'Cannot insert in to the table'
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

router.get('/:userId', (req, res) => {
	const id = req.params.userId;
	user.getUserById(id, function (error, response) {
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

module.exports = router;