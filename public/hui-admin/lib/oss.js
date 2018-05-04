var co = require('co');
var OSS = require('ali-oss');
// var ALY = require('aliyun-sdk');
// var moment = require("moment");
// var fs = require('fs');
var settings = require("../conf/settings");
// var Fiber = require("fibers");
var co = require('co');
var OSS = require('ali-oss');
var client = new OSS({
  region: settings.oss.region,
  accessKeyId: settings.oss.accessKeyId,
  accessKeySecret: settings.oss.accessKeySecret,
  bucket: settings.oss.bucket
});




exports.upload = function (content) {
    co(function* () {
      var result = yield client.put('object-key', new Buffer(content));
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
    
}