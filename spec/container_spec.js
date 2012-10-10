var frisby = require('frisby');
var config = require('../config');
var util = require('../lib/util.js');

var deleteContainer = function(container) {
	frisby.create('Remove a container.')
		.addHeader('Authentication', util.generateHeader(config.API_KEY, config.SECRET_KEY, '/containers/' + container.Container.slug))
		.delete(config.HOST + '/containers/' + container.Container.slug)
		.expectStatus(200)
		.expectJSON({
			success: true
		})
	.toss();
};

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
			.expectJSONTypes({
				Container: function(val) {
					expect(val).toContainJsonTypes({
						uuid: String,
						name: String,
						slug: String,
						container_item_count: Number,
						created: String,
						modified: String
					})
				},
				Location: Object
			})
			.afterJSON(deleteContainer)
		.toss();
	})
.toss();

frisby.create('Test adding and editing a container.')
	.addHeader('Authentication', util.generateHeader(config.API_KEY, config.SECRET_KEY, '/containers', {name: 'Test Container 2'}))
	.post(config.HOST + '/containers', {name: 'Test Container 2'})
	.expectStatus(200)
	.expectJSONTypes({
		uuid: String,
		slug: String
	})
	.afterJSON(function(container) {
		frisby.create('Edit the created container.')
			.addHeader('Authentication', util.generateHeader(config.API_KEY, config.SECRET_KEY, '/containers/' + container.slug, {name: 'Test Container 2 alt'}))
			.put(config.HOST + '/containers/' + container.slug, {name: 'Test Container 2 alt'})
			.expectStatus(200)
			.expectJSONTypes({
				Container: function(val) {
					expect(val).toContainJsonTypes({
						uuid: String,
						name: String,
						slug: String,
						container_item_count: Number,
						created: String,
						modified: String
					})
				}
			})
			.afterJSON(deleteContainer)
		.toss();
	})
.toss();