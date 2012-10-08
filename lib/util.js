var crypto = require('crypto');
var querystring = require('querystring');
var _ = require('underscore');

module.exports = (function() {
	var authType = 'BoxmeupAPI';
	return {
		generateHeader: function(apiKey, secretKey, uri, data) {
			var shasum = crypto.createHash('sha1'),
				now = Math.round(new Date().getTime() / 1000);
			data = this.orderObject(data || {});
			shasum.update('/api' + uri + '?' + querystring.stringify(data) + now + secretKey);
			return authType + ' api_key=' + apiKey + ',now=' + now + ',hash=' + shasum.digest('hex');
		},
		orderObject: function(obj) {
			var sortedObject = _.sortBy(obj, function(val, key, obj) {
				return key;
			});
			var orderedObject = {};
			_.each(_.keys(obj).sort(), function(key, index) {
			  orderedObject[key] = sortedObject[index];
			});
			return orderedObject;
		}
	}
}());