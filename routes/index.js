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
		request.post(url: 'https://api.remaxthailand.co.th/category/info',
			form: {
				
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
		}); 
		//res.send(data);
		
	}
	catch(error) {
		data.error = error.message;
		data.stack = error.stack;
		res.send(data);
		//res.render('error', { data: data });
	}
};