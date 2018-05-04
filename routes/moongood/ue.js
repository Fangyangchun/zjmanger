var express = require('express');
var router = express.Router();
var filter = require('../../util/filter');
var moment = require("moment");
var path = require('path');
// var ueditor = require('ueditor');
var ueditor = require('ueditor'); 
// var ue = require('./routes/cms/ue');
/* ajax */
// router.use('/', filter.authorizeAjax, function(req, res, next) {
//     res.setHeader('Content-Type', 'application/json');
//     res.redirect('/hui-admin/lib/ueditor/1.4.3/nodejs/config.json')
// }); 

router.use('/', ueditor(path.join(__dirname, '../../public'), function(req, res, next) {
    req.session.client = global.client;
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images/'+moment(date).format('YYYYMMDD');
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }

    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }

    else{
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/hui-admin/lib/ueditor/1.4.3/nodejs/config.json')
    }
})); 

module.exports = router;
