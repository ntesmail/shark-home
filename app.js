var express = require('express'),
    argv = require('yargs').argv,
    path = require('path');

var showdown  = require('showdown'),
    converter = new showdown.Converter();
var config = require('./shark-deploy-conf.js');

var app = express();
var webappDir = 'dist/';

//注册模板引擎
//如何使用模板引擎：http://www.expressjs.com.cn/advanced/developing-template-engines.html
//如何注册自定义模板引擎：http://www.expressjs.com.cn/guide/using-template-engines.html
app.engine('.html', require('ejs').__express);
// 后缀
app.set('view engine', 'html');
// 模板目录
app.set('views', path.join(__dirname, webappDir, 'app/examples'));

app.get(config.contextPath, function(req, res) {
    //向页面模板传递参数，可以传递字符串和对象，注意格式
    res.render('index', {converter: converter});
});

app.get(config.contextPath + '/index.html', function(req, res) {
    //向页面模板传递参数，可以传递字符串和对象，注意格式
    res.render('index', {converter: converter});
});


app.use(config.contextPath, express.static(path.join(webappDir, 'app')));

// 生成header等
app.use('/shark', require('./lib/routes/staticRoutes'));

app.use('/shark-home', express.static(path.join(webappDir, 'mimg')));

var port = argv.port || config.port;
app.listen(port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('express listening on %d', port);
});
