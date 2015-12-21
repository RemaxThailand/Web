var request = require('request');
exports.index = function(req, res, data){
	if (data.screen == 'index') {
		data.title = 'หน้าหลัก : ' + data.systemName;
	}
	//var json = JSON.parse(data);
	//res.send('Hello World :' + json);
	//res.json(data);
	exports.getCategory(req, res, data);

};

exports.getCategory = function(req, res, data){
	try{
		request.post({headers: { 'referer': 'https://'+req.headers['x-host'] }, url: data.apiUrl+'/category/info',
			form: {
				apiKey: data.apiKey,
				shop: data.shop
			}
		},
		function (error, response, body) {
			if (!error) {				
				var json = JSON.parse(body);
				data.category = json.result;
				res.render(data.screen, { data: data });
			} else{
				data.error = error.message;
				data.stack = error.stack;
				res.render('error', { data: data });
			}
		}); 
		
		
	}
	catch(error) {
		data.error = error.message;
		data.stack = error.stack;
		res.render('error', { data: data });
	}
};