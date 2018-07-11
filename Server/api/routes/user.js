const express = require('express');
const router = express.Router();
const sql = require('mssql');
const uuidv4 = require('uuid/v4');
const config = require('../../sqlconfig');


router.get('/', (req, res) => {
	sql.connect(config).then(() => {
		return sql.query`select * from Customers`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
		
			res.status(200).json({
				data: result.recordset
			});
		}
		else {
			res.status(404).json({
				message: 'No record found'
			});
		}
	}).catch(err => {
	
		sql.close();
		res.status(500).json({
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

router.post('/', (req, res) => {
	const user = {
		CustomerId: uuidv4(),
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Email: req.body.Email,
		Password: req.body.Password,
		Phone: req.body.Phone
	};
	sql.connect(config).then(() => {
		return sql.query`INSERT INTO Customers (CustomerId,FirstName,LastName,Email,Password,Phone) VALUES 
                        (${user.CustomerId},${user.FirstName},${user.LastName},${user.Email},
                        ${user.Password},${user.Phone})`;
	}).then(result => {
		sql.close();
	
		if (result.rowsAffected > 0) {
			res.status(201).json({
				message: 'Row created for the user',
				user: user
			});
		}
		else {
			res.status(500).json({
				message: 'something went wrong data cannot be creater'
			});
		}
	}).catch(err => {
		sql.close();
		res.status(500).json({
			message: 'error occured',
			error: err
		});
	});

	sql.on('error', err => {
		res.status(500).json({
			message: 'error occured',
			error: err
		});
	});
});

router.get('/:userId', (req, res) => {
	const id = req.params.userId;
	sql.connect(config).then(() => {
		return sql.query`select FirstName,LastName from Customers where CustomerId = ${id}`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
		
			res.status(200).json({
				data: result.recordset
			});
		}
		else {
			res.status(404).json({
				message: 'No record found'
			});
		}
	}).catch(err => {
	
		sql.close();
		res.status(500).json({
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

router.delete('/:userId', (req, res) => {
	const userId = req.params.userId;
	sql.connect(config, err => {
		if (err) {
			res.status(500).json({
				err: err
			});
		}
		new sql.Request()
			.input('CustomerId', sql.VarChar, userId)
			.execute('sp_DeleteCustomer', (err, result) => {
				sql.close();
				if (result.returnValue === 0) {
					res.status(200).json({
						message: 'success'
					});
				}
				else {
					res.status(500).json({
						message: 'problem in executing sp'
					});
				}
			});
	});
	sql.on('error', err => {
		res.status(500).json({
			err: err
		});
	});
});


module.exports = router;