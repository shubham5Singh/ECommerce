const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../../sqlconfig');
const nodemailer = require('nodemailer');

router.post('/login', (req, res) => {
	const credential = {
		email: req.body.email,
		password: req.body.password
	};
	sql.connect(config).then(() => {
		return sql.query`select * from Admin where Email = ${credential.email} and Password =${credential.password}`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			res.status(200).json({
				message: 'login successful',
				status: result.recordset[0].Status
			});
		}
		else {
			res.status(404).json({
				message: 'Invalid user'
			});
		}
	}).catch(err => {
		sql.close();
		res.status(500).json({
			message: 'something is not right',
			error: err
		});
	});

	sql.on('error', err => {
		sql.close();
		res.status(500).json({
			error: err
		});
	});
});

router.patch('/updatePassword/:email', (req, res) => {
	const email = req.params.email;
	const password = req.body.password;
	sql.connect(config).then(() => {
		return sql.query`UPDATE Admin SET Password = ${password} WHERE Email =${email}`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			res.status(200).json({
				message: 'updated password'
			});
		}
		else {
			res.status(404).json({
				message: 'NOt found data to update'
			});
		}
	}).catch(err => {
		sql.close();
		res.status(500).json({
			message: 'something is not right',
			error: err
		});
	});
});

router.get('/forgetPassword/:email', (req, res) => {
	const email = req.params.email;
	let transporter = nodemailer.createTransport({
		service: 'Outlook',
		auth: {
			user: 'shubham109singh@Outlook.com',
			pass: '*********'
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
				message:'cannot send mail',
				error:error
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