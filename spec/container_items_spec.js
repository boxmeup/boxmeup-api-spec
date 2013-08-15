var frisby = require('frisby');
var config = require('../config');
var util = require('../lib/util.js');

var expectedResult = {
	containerItem: {
		ContainerItem: {
			uuid: String,
			body: String,
			quantity: Number,
			created: String,
			modified: String
		}
	}
}

frisby.create('Get a list of all items (limit 150)')
	.addHeader('Authentication', util.generateHeader(config.TOKEN))
	.get(config.HOST + '/container_items')
	.expectStatus(200)
	.expectJSONTypes('*', expectedResult.containerItem)
.toss();

frisby.create('Get a list of items in a container')
	.addHeader('Authentication', util.generateHeader(config.TOKEN))
	.get(config.HOST + '/container_items?slug=' + config.containers.NonEmptyContainer)
	.expectStatus(200)
	.expectJSONTypes('*', expectedResult.containerItem)
.toss();

frisby.create('Attempt to get a list of items of a container that does not exist.')
	.addHeader('Authentication', util.generateHeader(config.TOKEN))
	.get(config.HOST + '/container_items?slug=nonexistent')
	.expectStatus(404)
.toss();
