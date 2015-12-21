var request = require('request');
exports.index = function(req, res, data){
	if (data.screen == 'index') {
		data.title = 'หน้าหลัก : ' + data.systemName;
	}else if(data.screen == 'claim_info'){
		data.title = 'ข้อมูลการเคลม : ' + data.systemName;
	}else if(data.screen == 'shop_register'){
		data.title = 'สนใจเปิดช็อป : ' + data.systemName;
	}else if(data.screen == 'payment'){
		data.title = 'วิธีการชำระเงิน : ' + data.systemName;
	}else if(data.screen == 'contact_us'){
		data.title = 'ติดต่อเรา : ' + data.systemName;
	}else if(data.screen == 'about_us'){
		data.title = 'เกี่ยวกับเรา : ' + data.systemName;
	}else if(data.screen == 'warranty_condition'){
		data.title = 'เงื่อนไขการรับประกัน : ' + data.systemName;
	}else if(data.screen == 'category'){
		data.title = 'หมวดหมู่สินค้า : ' + data.systemName;
	}
	
	//## Get Category Menu ##//
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
				if(data.screen == 'category'){
					data.categorySelected = data.subUrl;
					exports.getProductByCategory(req, res, data);
				}else if(data.screen == 'product'){
					
				}else{
					res.render(data.screen, { data: data });
				}
				
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
	//## End Get Category Menu ##//

};


//## Get Product by Category ##//
exports.getProductByCategory = function(req, res, data){
	try{
		request.post({headers: { 'referer': 'https://'+req.headers['x-host'] }, url: data.apiUrl + '/product/info',
			form: {
				apiKey: data.apiKey,
				shop: data.shop,
				type: 'byCategoryUrl4Web',
				value: data.subUrl
			}
		},
		function (error, response, body) {
			if (!error) {
				var json = JSON.parse(body);
				data.product = json.result;
				res.send(data);
				//res.render(data.screen, { data: data});
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