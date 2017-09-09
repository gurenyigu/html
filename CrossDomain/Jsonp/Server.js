var fs = require("fs");
var http = require("http");
var url = require("url");

http.createServer(function (req, res) {
    // 前端的JSONP值能使用GET方法进行通讯
    // 下面的模块对URL进行解析为对象
    var queryObj = url.parse(req.url, true).query;

    console.log(queryObj); // queryObj = {"callback": "handler"}

    fs.readFile("data.json", "utf-8", function (err, data) {
        console.log(data);

        res.write(queryObj.callback + "(" + data + ")");
        res.end();
    });
}).listen(8000);

console.log("监听 127.0.0.1:8000");
