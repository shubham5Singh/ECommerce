/* global describe it */
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
let sinon = require('sinon');

const app = require('../app');
const user = require('../api/repositories/user');
const userObject = require('./user');

let getUserStub = sinon.stub(user, 'getUser');
let postUserStub = sinon.stub(user, 'postUser');
let getUserByIdStub = sinon.stub(user, 'getUserById');


describe('GET /', function () {
	it('should respond with status 200', (done) => {
		getUserStub.yields(null, userObject);
		chai.request(app)
			.get('/users')
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(typeof res).to.equal('object');
				expect(err).to.equal(null);
				done();
			});
	});

	it('should respond with status 404', (done) => {
		getUserStub.yields(null, null);
		chai.request(app)
			.get('/users')
			.end(function (err, res) {
				expect(res).to.have.status(404);
				expect(res).to.equal(null);
				expect(err).to.equal(null);
				done();
			});
	});

	it('should respond with status 500', (done) => {
		getUserStub.yields(new Error(500), null);
		chai.request(app)
			.get('/users')
			.end(function (err, res) {
				expect(res).to.have.status(500);
				done();
			});
	});
});

describe('POST /', function () {
	it('It should respond with the 201', (done) => {
		postUserStub.yields(null, userObject[0]);
		chai.request(app)
			.post('/users')
			.send(
				userObject[0]
			)
			.then(function (res) {
				expect(res).to.have.status(201);
				done();
			});
	});

	it('It should respond with the 400', (done) => {
		postUserStub.yields(null, null);
		chai.request(app)
			.post('/users')
			.send(
				userObject[0]
			)
			.then(function (res) {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('It should respond with the 400', (done) => {
		postUserStub.yields(new Error(500), null);
		chai.request(app)
			.post('/users')
			.send(
				userObject[0]
			)
			.then(function (res) {
				expect(res).to.have.status(500);
				done();
			});
	});
});

describe('GET One User /', function () {
	it('should respond with status 200', (done) => {
		getUserByIdStub.yields(null, userObject[0]);
		chai.request(app)
			.get('/users/35ce68f9-12d5-40fc-8e52-b5edd96098e4')
			.end(function (err, res) {
				expect(res).to.have.status(200);
				done();
			});
	});

	it('should respond with status 404', (done) => {
		getUserByIdStub.yields(null, null);
		chai.request(app)
			.get('/users/35ce68f9-12d5-40fc-8e52-b5edd96098e4')
			.end(function (err, res) {
				expect(res).to.have.status(404);
				done();
			});
	});

	it('should respond with status 500', (done) => {
		getUserByIdStub.yields(new Error(500), null);
		chai.request(app)
			.get('/users/35ce68f9-12d5-40fc-8e52-b5edd96098e4')
			.end(function (err, res) {
				expect(res).to.have.status(500);
				done();
			});
	});
});
