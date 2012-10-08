var frisby = require('frisby');
var config = require('../config');

frisby.create('Test a successful user login')
	.post(config.HOST + '/users/login', {email: config.EMAIL, password: config.PASSWORD})
	.expectStatus(200)
	.expectJSONTypes({
		id: String,
		email: String,
		uuid: String,
		'api_key': String,
		'secret_key': String
	})
.toss()

frisby.create('Test a failed user login.')
	.post(config.HOST + '/users/login', {email: 'non-existant-email', password: 'rubish'})
	.expectStatus(403)
	.expectJSON({
		name: "Forbidden",
		url: '/api/users/login'
	})
.toss()