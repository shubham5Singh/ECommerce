const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const admin = require('../repositories/admin');

router.post('/login', (req, res) => {
	admin.logIn(req, function (error, response) {
		if (response != null) {
			res.status(200).json({
				message: 'Login Successful',
				status: response
			});
		}
		else {
			if (error == null) {
				res.status(200).json({
					message: 'Invalid User'
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

router.patch('/updatePassword/:email', (req, res) => {
	const email = req.params.email;
	const password = req.body.password;
	admin.updatePassword(email, password, function (error, response) {
		if (response != null) {
			res.status(200).json({
				message: 'updated password'
			});
		}
		else {
			if (error == null) {
				res.status(404).json({
					message: 'Not found data to update'
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

router.get('/forgetPassword/:email', (req, res) => {
	const email = req.params.email;
	let transporter = nodemailer.createTransport({
		service: 'Outlook',
		auth: {
			user: 'shubham109singh@Outlook.com',
			pass: '*/******87**/**/*@'
		}
	});

	let mailOptions = {
		from: '"Shubham" <shubham109singh@Outlook.com>',
		to: email,
		subject: 'Set New Password for E Commerce App',
		html: `<a href="#> Click this to set the new password for the ${email} </a>`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({
				message: 'cannot send mail',
				error: error
			});
		}
		else {
			res.status(200).json({
				message: 'mail send successfully',
				messageId: info.messageId
			});
		}
	});
});

module.exports = router;