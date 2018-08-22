const express = require('express');
const router = express.Router();
const sql = require('mssql');
const uuidv4 = require('uuid/v4');

const config = require('../../sqlconfig');

router.get('/', (req, res) => {
	new sql.ConnectionPool(config).connect().then((pool) => {
		return pool.query`select * from Order`;
	}).then(result => {
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
		res.status(500).json({
			error: err
		});
	});
	sql.close();
});

router.post('/', (req, res) => {
	const products = req.body.orderDetails;
	const order = {
		OrderId: uuidv4(),
		CustomerId: req.body.address.customerId,
		OrderNumber: '',
		OrderDate: new Date(),
		Status: 'Not Delever'
	};
	new sql.ConnectionPool(config).connect().then((pool) => {
		products.forEach(element => {
			pool.query`INSERT INTO [OrderDetail] (OrderId,ProductId,OrderNumber,Price,Quantity,Discount,Total,Size,Color) VALUES
																			 (${order.OrderId},${element.ProductId},${order.OrderNumber},${element.UnitPrice},${element.Quantity},${element.Discount},${(element.UnitPrice - element.Discount) * element.Quantity},${element.AvailableSize},${element.Color})`
		});
		return pool.query`INSERT INTO [Order] (OrderId,CustomerId,OrderNumber,OrderDate,Status) VALUES 
		(${order.OrderId},${order.CustomerId},${order.OrderNumber},${order.OrderDate},${order.Status})`;
	}
	).then(result => {
		if (result.rowsAffected > 0) {
			res.status(201).json({
				message: 'Order Created'
			});
		}
		else {
			res.status(500).json({
				message: 'something is not right'
			});
		}

	});
	sql.close();
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