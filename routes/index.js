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
	try{
		/* request.post({headers: { 'referer': 'https://test.remaxthailand.co.th', 'User-Agent': 'request' }, url: 'https://api-test.remaxthailand.co.th/category/info',
			form: {
				apiKey: 'E2ECCC83-6B00-4741-986E-DEB0F57B33DB',
				shop: 'POWERDDH-8888-8888-B620-48D3B6489999'
			}
		},
		function (error, response, body) {
			if (!error) {				
				//var json = JSON.parse(body);
				//data.category = json.result;
				res.json(body);
			} else{
				data.error = error.message;
				data.stack = error.stack;
				res.send(data);
				//res.render('error', { data: data });
			}
		}); */ 
		//res.send(data);
		
		request('https://www.facebook.com', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.json(body);// Show the HTML for the Google homepage.
			}else{
				res.json(error);
			}
		});
	}
	catch(error) {
		data.error = error.message;
		data.stack = error.stack;
		res.send(data);
		//res.render('error', { data: data });
	}
};