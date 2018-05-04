var express = require('express');
var router = express.Router();
var filter = require('../../util/filter');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var fse = require('fs-extra');
var crypto = require('crypto');
var utils = require('utility');
var Busboy = require('busboy');
var path = require('path');
var moment = require("moment");
var os = require('os');
var snowflake = require('node-snowflake').Snowflake;
var settings = require("../../conf/settings");

/* 图片上传接口*/

router.post('upimg', function(req, res, next){
  console.log(req.cookies['token'])
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var date = new Date();
    var img_url = '/images/'+moment(date).format('YYYYMMDD');
    var tmpdir = path.join(os.tmpDir(), path.basename(filename));
    var name = snowflake.nextId() + path.extname(tmpdir);
    var ossStream = global.client;
    var date = new Date();
    var osspath = settings.oss.rootPath+name;
     console.log(osspath);
    var url = settings.oss.returnUrl+osspath;
    var localPath = settings.oss.localPath+img_url+"/"+name;
    var upload = ossStream.upload({
      Bucket: settings.oss.bucket,
      Key: osspath
    });

    upload.on('error', function (error) {
      console.log('error:', error);
    });

    upload.on('part', function (part) {

      console.log('part:', part);
    });

    upload.on('uploaded', function (details) {
      console.log('details:', details);
      res.json([
        {
          'url': url,
          'fileName': filename
        }
      ])
      // res.json({
      //     'code': 0,
      //     'url': url,
      //     'filename': filename
      // })
    });

    file.pipe(upload);
  });
  req.pipe(busboy);
});


/* GET home page. */
router.get('/', filter.authorize, filter.authValid, function(req, res, next) {
  res.render('moongood/index');
});

router.get('/:page', filter.authorize, filter.authValid, function(req, res, next) {
  res.render("moongood/"+req.params.page);
});

router.get('/:module/:page', filter.authorize, filter.authValid, function(req, res, next) {
  res.render("moongood/"+req.params.module+"/"+req.params.page);
});



module.exports = router;
