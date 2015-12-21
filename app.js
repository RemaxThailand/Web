var http = require('http')
	, express = require('express')
	, favicon = require('serve-favicon')
	, fs = require('fs')
	, path = require('path')
	, methodOverride = require('method-override')
	, bodyParser = require('body-parser')
	, errorHandler = require('errorhandler')
	, routes = require('./routes');

global.config = require('./config.js');

var app = express();

app.set('port', config.port || 9999);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/favicon.ico'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.get('*', function(req, res) {
	//## Initial Data ##//
	data = {};
	data.screen = 'index';
	//data.shop = 'POWERDDH-8888-8888-B620-48D3B6489999'; //config.shop;
	//data.apiUrl = 'https://api.remaxthailand.co.th';//config.apiUrl;
	//data.apiKey = 'E2ECCC83-6B00-4741-986E-DEB0F57B33DB'; //config.apiKey;
	//data.websiteUrl = //config.websiteUrl;
	//data.systemUrl = //config.systemUrl;
	data.categorySelected = '';
	//data.Moment = require('moment');
	
	//res.header('Access-Control-Allow-Origin', '*');

	var url = req.originalUrl.split('/');
	url = url.filter(function(n){ return n !== ''; });
	data.url = url;
	
	if ( url.length >= 1 ) {
		data.screen = url[0];
		fs.exists('./views/'+data.screen+'.jade', function (exists) {
			if (exists) {
				fs.exists('./public/javascripts/'+data.screen+'.js', function (exists) {
					data.script = (exists) ? '/javascripts/'+data.screen+'.js' : '';
					data.subUrl = (url.length == 1 ) ? '' : url[1];
					routes.index(req, res, data);
				});
			}
			else {
				routes.index(req, res, data);
			}
		});
	}
	else {
		routes.index(req, res, data);
	}
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
