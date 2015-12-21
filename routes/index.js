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
					data.categoryName = data.category.name.indexOf(data.subUrl);
					data.categorySelected = data.subUrl;
					exports.getProductByCategory(req, res, data);
				}else if(data.screen == 'product'){
					
				}
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
	//## End Get Category Menu ##//

};


//## Get Product by Category ##//
exports.getProductByCategory = function(req, res, data){
	res.send(data);
	/*try{
		request.post({headers: { 'referer': data.websiteUrl }, url: data.apiUrl + '/product/info',
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
				
				//## [Start] Summary Brand in Category ##//
				var brandArrey = [];					
				for ( i=0; i< json.result.length; i++){
					var info = {};
					info['BrandName'] = json.result[i].Brand;
					brandArrey.push(info);
				}
				
				var unique = {};
				var distinct = [];
				for( var i in brandArrey ){
					if( typeof(unique[brandArrey[i].BrandName]) == 'undefined'){
						distinct.push(brandArrey[i]);
					}
					unique[brandArrey[i].BrandName] = 0;
				}
				distinct.sort();
				distinct.reverse();
				
				data.brandInCategory = distinct;
				//## [End] Summary Brand in Category ##//
				
				data.title = data.categoryName + ' - ' + data.title;
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
	}*/
};