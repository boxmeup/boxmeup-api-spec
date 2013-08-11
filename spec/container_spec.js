var frisby = require('frisby');
var config = require('../config');
var util = require('../lib/util.js');

var deleteContainer = function(container) {
	frisby.create('Remove a container.')
		.addHeader('Authentication', util.generateHeader(config.TOKEN))
		.delete(config.HOST + '/containers/' + container.Container.slug)
		.expectStatus(200)
		.expectJSON({
			success: true
		})
	.toss();
};

var fullContainer = {
	Container: {
		uuid: String,
		name: String,
		slug: String,
		'container_item_count': Number,
		created: String,
		modified: String
	},
	Location: Object
};

var containerPreview = {
	uuid: String,
	slug: String
}

frisby.create('Test adding a container.')
	.addHeader('Authentication', util.generateHeader(config.TOKEN))
	.post(config.HOST + '/containers', {name: 'Test Container 1'})
	.expectStatus(200)
	.expectJSONTypes(containerPreview)
	.afterJSON(function(container) {
		frisby.create('Get the created container.')
			.addHeader('Authentication', util.generateHeader(config.TOKEN))
			.get(config.HOST + '/containers?slug=' + container.slug)
			.expectStatus(200)
			.expectJSONTypes(fullContainer)
			.afterJSON(deleteContainer)
		.toss();
	})
.toss();

frisby.create('Test adding and editing a container.')
	.addHeader('Authentication', util.generateHeader(config.TOKEN))
	.post(config.HOST + '/containers', {name: 'Test Container 2'})
	.expectStatus(200)
	.expectJSONTypes(containerPreview)
	.afterJSON(function(container) {
		frisby.create('Edit the created container.')
			.addHeader('Authentication', util.generateHeader(config.TOKEN))
			.put(config.HOST + '/containers/' + container.slug, {name: 'Test Container 2 alt'})
			.expectStatus(200)
			.expectJSONTypes(fullContainer)
			.afterJSON(deleteContainer)
		.toss();
	})
.toss();

frisby.create('Search containers.')
	.addHeader('Authentication', util.generateHeader(config.TOKEN))
	.get(config.HOST + '/containers/search?query=test')
	.expectStatus(200)
.toss();

