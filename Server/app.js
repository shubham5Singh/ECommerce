var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const userRoutes = require('./api/routes/user');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
const admminRoutes = require('./api/routes/admin');
const categoryRoutes = require('./api/routes/category');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,X-Requestes-With,Content-Type,Accept,Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');
		return res.status(200).json({});
	}
	next();
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/admin',admminRoutes);
app.use('/category',categoryRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
