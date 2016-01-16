var request = require('request');
exports.index = function(req, res, data){
	if (data.screen == 'index') {
		data.title = 'หน้าหลัก : ' + data.systemName;
		data.description = 'หน้าหลัก';
	}else if(data.screen == 'claim_info'){
		data.title = 'ข้อมูลการเคลม : ' + data.systemName;
		data.description = 'ข้อมูลการเคลม';
	}else if(data.screen == 'shop_register'){
		data.title = 'สนใจเปิดช็อป : ' + data.systemName;
		data.description = 'สนใจเปิดช็อป';
	}else if(data.screen == 'payment'){
		data.title = 'วิธีการชำระเงิน : ' + data.systemName;
		data.description = 'วิธีการชำระเงิน';
	}else if(data.screen == 'contact_us'){
		data.title = 'ติดต่อเรา : ' + data.systemName;
		data.description = 'ติดต่อเรา';
	}else if(data.screen == 'about_us'){
		data.title = 'เกี่ยวกับเรา : ' + data.systemName;
		data.description = 'เกี่ยวกับเรา';
	}else if(data.screen == 'warranty_condition'){
		data.title = 'เงื่อนไขการรับประกัน : ' + data.systemName;
		data.description = 'เงื่อนไขการรับประกัน';
	}else if(data.screen == 'category'){
		data.title = 'หมวดหมู่สินค้า : ' + data.systemName;
		data.description = 'หมวดหมู่สินค้า';
	}else if(data.screen == 'register'){
		data.title = 'สมัครตัวแทนจำหน่าย : ' + data.systemName;
		data.description = 'สมัครตัวแทนจำหน่าย';
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
					var url = req.url.split('-');
					data.productId = url[url.length-1];
					exports.getProductByItem(req, res, data);
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
		request.post({headers: { 'referer': 'https://'+req.headers['x-host'] }, url: data.apiUrl+'/product/info',
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
				//res.send(data);
				res.render(data.screen, { data: data});
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

//## Get Product by Item ##//
exports.getProductByItem = function(req, res, data){
	try{
		request.post({headers: { 'referer': 'https://'+req.headers['x-host'] }, url: data.apiUrl+'/product/info',
			form: {
				apiKey: data.apiKey,
				shop: data.shop,
				type: 'item',
				value: data.productId
			}
		},
		function (error, response, body) {
			if (!error) {
				var json = JSON.parse(body);
				data.productDetail = json.result;
				//res.send(data.product);
				data.title = data.productDetail.name+' : '+ data.systemName;
				data.description = data.productDetail.detail;
				res.render(data.screen, { data: data});
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