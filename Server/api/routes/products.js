const express = require('express');
const router = express.Router();
const sql = require('mssql');
const uuidv4 = require('uuid/v4');

const config = require('../../sqlconfig');


router.get('/', (req, res) => {
	sql.connect(config).then(() => {
		return sql.query`select * from Product`;
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
	const product = {
		ProductId: uuidv4(),
		ProductName: req.body.ProductName,
		ProductDescription: req.body.ProductDescription,
		CategoryId: req.body.CategoryId,
		UnitPrice: req.body.UnitPrice,
		AvailableSize: req.body.AvailableSize,
		Color: req.body.Color,
		Discount: req.body.Discount,
		UnitWeight: req.body.UnitWeight,
		UnitInStock: req.body.UnitInStock
	};

	sql.connect(config, err => {
		if (err) {
			res.status(500).json({
				error: err
			});
		}
		new sql.Request()
			.input('ProductId', sql.VarChar, product.ProductId)
			.input('ProductName', sql.VarChar, product.ProductName)
			.input('ProductDescription', sql.VarChar, product.ProductDescription)
			.input('CategoryId', sql.VarChar, product.CategoryId)
			.input('UnitPrice', sql.Float, product.UnitPrice)
			.input('AvailableSize', sql.VarChar, product.AvailableSize)
			.input('Color', sql.VarChar, product.Color)
			.input('Discount', sql.Float, product.Discount)
			.input('UnitWeight', sql.Float, product.UnitWeight)
			.input('UnitInStock', sql.Int, product.UnitInStock)
			.execute('sp_InsertProduct', (err, result) => {
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

router.get('/:productId', (req, res) => {
	const id = req.params.productId;
	sql.connect(config).then(() => {
		return sql.query`select * from Product where ProductId = ${id}`;
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

router.patch('/:productId', (req, res) => {
	const productId = req.params.productId;
	const product = {
		ProductName: req.body.ProductName,
		ProductDescription: req.body.ProductDescription,
		CategoryId: req.body.CategoryId,
		UnitPrice: req.body.UnitPrice,
		AvailableSize: req.body.AvailableSize,
		Color: req.body.Color,
		Discount: req.body.Discount,
		UnitWeight: req.body.UnitWeight,
		UnitInStock: req.body.UnitInStock
	};
	sql.connect(config, err => {
		if (err) {
			res.status(500).json({
				err: err
			});
		}
		new sql.Request()
			.input('ProductId', sql.VarChar, productId)
			.input('ProductName', sql.VarChar, product.ProductName)
			.input('ProductDescription', sql.VarChar, product.ProductDescription)
			.input('CategoryId', sql.VarChar, product.CategoryId)
			.input('UnitPrice', sql.Float, product.UnitPrice)
			.input('AvailableSize', sql.VarChar, product.AvailableSize)
			.input('Color', sql.VarChar, product.Color)
			.input('Discount', sql.Float, product.Discount)
			.input('UnitWeight', sql.Float, product.UnitWeight)
			.input('UnitInStock', sql.Int, product.UnitInStock)
			.execute('sp_UpdateProduct', (err, result) => {
				sql.close();
				if (err) {
					res.status(500).json({
						message: 'problem in executing sp',
						err: err
					});
				}
				else {

					res.status(200).json({
						message: 'success',
						result: result
					});
				}
			});

	});
});

router.delete('/:productId', (req, res) => {
	const productId = req.params.productId;
	sql.connect(config, err => {
		if (err) {
			res.status(500).json({
				err: err
			});
		}
		new sql.Request()
			.input('ProductId', sql.VarChar, productId)
			.execute('sp_DeleteProduct', (err, result) => {
				sql.close();
				console.log(result)
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