var request = require('request');
exports.index = function(req, res, data){
	if (data.screen == 'index') {
		data.title = 'หน้าหลัก';
	}
	//var json = JSON.parse(data);
	//res.send('Hello World :' + json);
	//res.json(data);
	exports.getCategory(req, res, data);

};

exports.getCategory = function(req, res, data){
	request('http://www.google.com', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body) // Show the HTML for the Google homepage.
		}
	})
};