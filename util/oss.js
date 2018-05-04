var co = require('co');
var moment = require("moment");
var fs = require('fs');
var settings = require("../conf/settings");
var Fiber = require("fibers");

var deleteFolderRecursive = function(path) {

    var files = [];

    if( fs.existsSync(path) ) {

        files = fs.readdirSync(path);

        files.forEach(function(file,index){

            var curPath = path + "/" + file;

            if(fs.statSync(curPath).isDirectory()) { // recurse

                deleteFolderRecursive(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

    }

};

exports.upload = function (req, res, tmpdir) {
	var name = req.session.ueimg.name;
	var img_url = req.session.ueimg.img_url;
	var client = req.session.client;
	var date = new Date();
	var path = settings.oss.rootPath+"upload/"+moment(date).format('YYYYMMDD')+"/"+name;
	var url = settings.oss.returnUrl+path;
	var localPath = settings.oss.localPath+img_url+"/"+name;
	var filename = req.session.ueimg.filename;

  	co(function* () {
		client.useBucket(settings.oss.bucket);
		var result = yield client.put(path, tmpdir);
		console.log(result);
		//deleteFolderRecursive(settings.oss.localPath+img_url);
		res.json({
		    'url': url,
		    'original': filename,
		    'state': 'SUCCESS'
		})
	}).catch(function (err) {
		console.log(err);
	});
	


	
	
}