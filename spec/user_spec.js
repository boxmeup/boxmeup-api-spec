var frisby = require('frisby');
var config = require('../config');

frisby.create('Test a successful user login')
	.post(config.HOST + '/users/login', {email: config.EMAIL, password: config.PASSWORD, application: 'Boxmeup API Tester'})
	.expectStatus(200)
	.expectJSONTypes({
		token: String
	})
.toss();

frisby.create('Test a failed user login.')
	.post(config.HOST + '/users/login', {email: 'non-existant-email', password: 'rubish', application: 'Boxmeup API Tester'})
	.expectStatus(403)
	.expectJSON({
		name: "Forbidden",
		url: '/api/users/login'
	})
.toss();
