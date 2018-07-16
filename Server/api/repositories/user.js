const sql = require('mssql');
const uuidv4 = require('uuid/v4');
const config = require('../../sqlconfig');

exports.getUser = function (response) {
	sql.connect(config).then(() => {
		return sql.query`select * from Customers`;
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

exports.postUser = function (req, response) {
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
			response(null, user);
		}
		else {
			response(null, null);
		}
	}).catch(err => {
		sql.close();
		response(err, null);
	});

	sql.on('error', err => {
		response(err, null);
	});
};

exports.getUserById = function (id, response) {
	sql.connect(config).then(() => {
		return sql.query`select FirstName,LastName from Customers where CustomerId = ${id}`;
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

