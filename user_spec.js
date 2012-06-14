var frisby = require('frisby');
var config = require('./config');

frisby.create('Test a successful user login')
	.post(config.HOST + '/users/login', {email: config.EMAIL, password: config.PASSWORD})
	.expectStatus(200)
	.expectJSONTypes("results", {
		api_key: String,
		secret_key: String
	})
.toss()

frisby.create('Test a failed user login.')
	.post(config.HOST + '/users/login', {email: 'non-existant-email', password: 'rubish'})
	.expectStatus(200) // @todo change api to return proper response code instead of 200
	.expectJSON("error", {
		message: "Invalid email or password.",
		code: 403
	})
.toss()