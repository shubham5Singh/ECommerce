const express = require('express');
const router = express.Router();
const sql = require('mssql');
const uuidv4 = require('uuid/v4');

const config = require('../../sqlconfig');

router.get('/', (req, res) => {
	sql.connect(config).then(() => {
		return sql.query`select * from Order`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			res.status(200).json({
				data: result.recordset
			});
		}
		else {
			res.status(404).json({
				message: 'No record Found'
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
			message: err
		});
	});
});

router.post('/', (req, res) => {
	const order = {
		OrderId: uuidv4(),
		CustomerId: req.body.CustomerId,
		OrderNumber: req.body.OrderNumber,
		OrderDate: Date.now(),
		Status: req.body.Status
	};

	sql.connect(config, err => {
		if (err) {
			res.status(500).json({
				error: err
			});
		}
		new sql.Request()
			.input('OrderId', sql.NVarChar, order.ProductId)
			.input('CustomerId', sql.NVarChar, order.CustomerId)
			.input('OrderNumber', sql.NVarChar, order.OrderNumber)
			.input('OrderDate', sql.Date, order.OrderDate)
			.input('Status', sql.NVarChar, order.Status)
			.execute('sp_InsertOrder', (err, result) => {
				sql.close();
				if (result.returnValue === 0) {
					res.status(201).json({
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

router.get('/:orderId', (req, res) => {
	const id = req.params.orderId;
	sql.connect(config).then(() => {
		return sql.query`select * from Order where OrderId = ${id}`;
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

router.delete('/:orderId', (req, res) => {
	const orderId = req.params.orderId;
	sql.connect(config, err => {
		if (err) {
			res.status(500).json({
				err: err
			});
		}
		new sql.Request()
			.input('ProductId', sql.NVarChar, orderId)
			.execute('sp_DeleteOrder', (err, result) => {
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