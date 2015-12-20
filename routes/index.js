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
		res.send('haha');
	}
	catch(error) {
		data.error = error.message;
		data.stack = error.stack;
		console.log(data);
		//res.render('error', { data: data });
	}
};