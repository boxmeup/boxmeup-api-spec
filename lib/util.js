module.exports = (function() {
	var authType = 'BoxmeupAPI';
	return {
		generateHeader: function(token) {
			return authType + ' token=' + token;
		}
	}
}());
