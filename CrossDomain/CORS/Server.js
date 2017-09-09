var fs = require("fs");
var http = require("http");
var url = require("url");
//var body = require('body-parser');

var data = '{"name": "wudong", "uid": 414}';

http.createServer(function (request, response) {
	console.log(request.body);
	var path = url.parse(request.url).path;
	//    console.log(path);
	if (path == "/Server") {
		// 这个头部是CORS必须的, 指定"*"可以接受任何域名请求. 当然可以指定域名
		response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1");
		response.writeHead(200, {
			"Content-type": "text/plain"
		});
		response.end(data);
	}
}).listen(8000);

console.log("监听 127.0.0.1:8000 ...");
