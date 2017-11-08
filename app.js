/**
 * Created by coco on 2017/11/3.
 */
var http = require('http');

var fs = require('fs');

/*var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '000123',
    database : 'test'
});

connection.connect();

var getList = function (key) {
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results;
    });
};*/


var server = http.createServer();

// var jquery = require('jquery');
var dataList = [
    {a:1},
    {a:1},
    {a:1},
    {a:1},
    {a:1}
];

// 4. 设置请求处理
var handleRequest = function (req, res) {
    var url = req.url;

    if(url === '/'){
        fs.readFile('./index.html',function (err, data) {
            if(err){
                throw err
                // res.writeHead(404);
                // return res.end()
            }
            res.writeHead(200,{
                'Content-Type': 'text/html'
            });
            res.end(data)
        })
        // res.end('<h3>index page</h3>')
    }else if(url.startsWith('/static')){
        var urlPath = '.' + url;
        fs.readFile(urlPath,function (err, data) {
            if(err){
                res.writeHead(404);
                return res.end()
            }
            res.end(data)
        })
    }else if(url.startsWith('/getList')){
        //}else if(url === '/getList'){
        //res.end(JSON.stringify(getList()));

        res.end(JSON.stringify(dataList));

    }else if(url === '/favicon.ico'){
        //res.writeHead(404);
        res.end();
    }else {
        res.writeHead(404);
        res.end();
    }

};

// 2. 绑定request请求事件
//      所有请求的入口
server
    .on('request',handleRequest)
    // 3. 绑定端口号8080，开启服务
    .listen(3000,function () {
        console.log('http://localhost:3000/')
    });
