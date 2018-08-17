const sql = require('mssql');
const uuidv4 = require('uuid/v4');
const config = require('../../sqlconfig');

exports.getAllProduct = function (response) {
	sql.close();
	sql.connect(config).then(() => {
		return sql.query`select * from Product`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			response(null, result.recordset);
		}
		else {
			response(null, null);
		}
	}).catch(err => {
		sql.close();
		response(err, null);
	});

	sql.on('error', err => {
		sql.close();
		response(err, null);
	});
};

exports.createProduct = function (req, response) {
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
		UnitInStock: req.body.UnitInStock,
		image:req.body.image
	};

	sql.connect(config, err => {
		if (err) {
			response(err, null);
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
			.input('image', sql.VarChar, product.image)
			.execute('sp_InsertProduct', (err, result) => {
				sql.close();
				if (result.returnValue === 0) {
					response(null, 'success');
				}
				else {
					response(new Error(500), null);
				}
			});
	});
	sql.on('error', err => {
		response(err, null);
	});
};

exports.getProductDetail = function (id, response) {
	sql.close();
	sql.connect(config).then(() => {
		return sql.query`select * from Product where ProductId = ${id}`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			response(null, result.recordset);
		}
		else {
			response(null, null);
		}
	}).catch(err => {
		sql.close();
		response(err, null);
	});

	sql.on('error', err => {
		sql.close();
		response(err,null);
	});
};

exports.updateProduct = function (productId, req, response) {
	const product = {
		ProductName: req.body.ProductName,
		ProductDescription: req.body.ProductDescription,
		CategoryId: req.body.CategoryId,
		UnitPrice: req.body.UnitPrice,
		AvailableSize: req.body.AvailableSize,
		Color: req.body.Color,
		Discount: req.body.Discount,
		UnitWeight: req.body.UnitWeight,
		UnitInStock: req.body.UnitInStock,
		image : req.body.image
	};
	sql.connect(config, err => {
		if (err) {
			response(err, null);
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
			.input('image', sql.VarChar, product.image)
			.execute('sp_UpdateProduct', (err, result) => {
				sql.close();
				if (err) {
					response(err, null);
				}
				else {
					response(null, 'success');
				}
			});

	});
};

exports.deleteProduct = function (productId, response) {
	sql.connect(config, err => {
		if (err) {
			response(err, null);
		}
		new sql.Request()
			.input('ProductId', sql.VarChar, productId)
			.execute('sp_DeleteProduct', (err, result) => {
				sql.close();
				if (result.returnValue === 0) {
					response(null, 'success');
				}
				else {
					response(new Error(500), null);
				}
			});

	});
	sql.on('error', err => {
		sql.close();
		response(err, null);
	});
};