var frisby = require('frisby');
var config = require('../config');
var util = require('../lib/util.js');

frisby.create('Test adding a container.')
	.addHeader('Authentication', util.generateHeader(config.API_KEY, config.SECRET_KEY, '/containers', {name: 'Test Container 1'}))
	.post(config.HOST + '/containers', {name: 'Test Container 1'})
	.expectStatus(200)
	.expectJSONTypes({
		uuid: String,
		slug: String
	})
	.afterJSON(function(container) {
		frisby.create('Get the created container.')
			.addHeader('Authentication', util.generateHeader(config.API_KEY, config.SECRET_KEY, '/containers', {slug: container.slug}))
			.get(config.HOST + '/containers?slug=' + container.slug)
			.expectStatus(200)
		.toss();
	})
.toss();