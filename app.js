var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ueditor = require('ueditor');
var session = require("express-session");
var OSS = require('ali-oss');
var ALY = require('aliyun-sdk');
var moment = require("moment");
var settings = require("./conf/settings");

var routes = require('./routes/index');
var moongood = require('./routes/moongood/index');
// var ue = require('./routes/moongood/ue');

var app = express();

var swig = require('swig');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//开发环境不缓存页面模板
swig.setDefaults({
    cache: false
});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'this is the secret for cookie',
    resave: false,
    saveUninitialized: true
}));

// oss
var ossStream = require('aliyun-oss-upload-stream')(new ALY.OSS({
    accessKeyId: settings.oss.accessKeyId,
    secretAccessKey: settings.oss.accessKeySecret,
    endpoint: settings.oss.endpoint,
    apiVersion: '2013-10-15'
}));
global.client = ossStream;

//ueditor
app.use("/hui-admin/lib/ueditor/1.4.3/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    req.session.client = client;
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images/' + moment(date).format('YYYYMMDD');
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }

    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }

    // 客户端发起其它请求
    else {

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/hui-admin/lib/ueditor/1.4.3/nodejs/config.json')
    }

}));
// app.use("/hui-admin/lib/ueditor/1.4.3/ue", ue);

app.use('/moongood', moongood);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.set('port', process.env.PORT = 3000);
app.listen(settings.port);

module.exports = app;