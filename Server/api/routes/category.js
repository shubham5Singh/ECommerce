const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../../sqlconfig');
const uuidv4 = require('uuid/v4');

router.get('/', (req, res) => {
	sql.connect(config).then(() => {
		return sql.query`select * from Categories`;
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

router.get('/:categoryId',(req,res) =>{
	const categoryId = req.params.categoryId;
	sql.connect(config).then(() => {
		return sql.query`SELECT * FROM Categories WHERE CategoryId = ${categoryId}`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			res.status(200).json({
				data: result.recordset
			});
		}
		else {
			res.status(404).json({
				message: 'NOt found data'
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

router.post('/', (req, res) => {
	const category = {
		CategoryId: uuidv4(),
		CategoryName: req.body.CategoryName,
		Description: req.body.Description,
		Active: req.body.Active
	};
	sql.connect(config).then(() => {
		return sql.query`INSERT INTO Categories (CategoryId,CategoryName,Description,Active) VALUES 
                        (${category.CategoryId},${category.CategoryName},${category.Description},${category.Active})`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			res.status(201).json({
				message: 'Row created for the category',
				category: category
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

router.patch('/:categoryId',(req,res) =>{
	const categoryId = req.params.categoryId;
	const category = {
		CategoryName: req.body.CategoryName,
		Description: req.body.Description,
		Active: req.body.Active
	};
	sql.connect(config).then(() => {
		return sql.query`UPDATE Categories SET CategoryName = ${category.CategoryName}, Description = ${category.Description},
										Active = ${category.Active} WHERE CategoryId =${categoryId}`;
	}).then(result => {
		sql.close();
		if (result.rowsAffected > 0) {
			res.status(200).json({
				message: 'updated category'
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

router.delete('/:categoryId',(req,res) =>{
	const categoryId = req.params.categoryId;
	sql.connect(config, err => {
		if (err) {
			res.status(500).json({
				err: err
			});
		}
		new sql.Request()
			.input('CategoryId', sql.VarChar, categoryId)
			.execute('sp_DeleteCategory', (err, result) => {
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