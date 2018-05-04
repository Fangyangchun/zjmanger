var superagent = require('superagent');
var settings = require("../conf/settings");
var express = require('express');// 首先引入 cookie-parser 这个模块
var cookieParser = require('cookie-parser');
// var common = require("../public/hui-admin/static/common");
exports.authorize = function(req, res, next) {
	// next()
     // console.log(req.url.split('?')[0]);
	// req.cookies["ven"]=req._parsedOriginalUrl.query
	// res.cookie('haha', 'name1=value1&name2=value2', {maxAge:10*1000, path:'/', httpOnly:true});
	
	if(req.cookies['token']){           // fangyc 2018.5.4 modify start
		next();
	} else {
		res.redirect('/login?'+req._parsedOriginalUrl.query);
	}    								// fangyc 2018.5.4 modify end
		// if(req.cookies['token']&&req.cookies['ven']){           // fangyc 2018.5.3注释 start
		// 	if(req.query.a){
		// 		if(req.query.a.split("_")[0]==req.cookies['ven']){
		// 			next()
		// 		}else{
		// 			res.redirect('/login?'+req._parsedOriginalUrl.query);
		// 		}
		// 	}else{
		// 		next()
		// 	}          // fangyc 2018.5.3注释   end
	 // var request = superagent
		//  .get("http://"+settings.proxy.host+":"+settings.proxy.port+'/user/staff/info?token='+req.cookies['token'])
		//  .set({
		// 	 'host': "www.zhongjing-hz.com",
		// 	 'cookie': "token="+req.cookies['token']
		//  })
		//  .end(function (err, data) {
		// 	console.log("------用户登录信息------");
		// 	console.log(data.body);
		// 	if(!err && data.body.status==0){
		// 		res.locals.user = data.body.data.info;
		// 		next();
		// 	}else{
		// 		console.log(data.body);
		// 		res.cookie('redirect', req.route.path, {path:'/'});
		// 		//res.setHeader("Set-Cookie", ["redirect="+req.route.path], {path:'/', httpOnly:true});
		// 		res.redirect('/login');
		// 	}
		//  });
		// }else{	  // fangyc 2018.5.3注释  start
			// res.redirect('/login?'+req._parsedOriginalUrl.query); 
			// res.redirect('/login')
		// }     // fangyc 2018.5.3注释 end

	
}
exports.getMenu = function(req, res, next){
	next();
	// var request = superagent
	// 	 .post("http://"+settings.proxy.host+":"+settings.proxy.port+'/menuList')
	// 	 .set(req.headers)
	// 	 .send({ url: "/erp"+req.url.split('?')[0]})
	// 	.end(function (err, data) {
	// 		console.log("------菜单列表------");
	// 		if(!err && data.body.success){
	// 			console.log(data.body.data.menuList);
	// 			res.locals.menuList = data.body.data.menuList;
	// 			//console.log(res.locals.menuList);
	// 			next();
	// 		}else{
	// 			console.log(data.body);
	// 			res.render('error');
	// 		}
	// 	});
}
exports.authValid = function(req, res, next){
	next();
	// console.log("------当前页面地址------");
	// console.log("/erp"+req.url.split('?')[0]);
	// var request = superagent
	// 	 .get("http://"+settings.proxy.host+":"+settings.proxy.port+'/user/permission/module/web/list?token='+req.cookies['token'])
	// 	 .set(req.headers)
	// 	.end(function (err, data) {
	// 		console.log("------权限列表------");
	// 		console.log(data.body.data);
	// 		if(!err && data.body.status==0){
	// 			var subUrl = data.body.data,
	// 				subUrlList = [];
	// 			for(module in subUrl){
	// 				for(var i=0;i<subUrl[module].length;i++){
	// 					subUrlList[subUrl[module][i].elePath] = true;
	// 				}
	// 			}
	// 			res.locals.subUrlList = subUrlList;
	// 			console.log(subUrlList);
	// 			next();
	// 		}else{
	// 			console.log(data.body);
	// 			res.render('error');
	// 		}
	// 	});
}
exports.authorizeAjax = function(req, res, next) {
	next();
 //    var request = superagent
	// .post("http://"+settings.proxy.host+":"+settings.proxy.port+'/jf/platform/user/getCookieByUserIds')
	// .set({
	// 	 'host': "www.kid06.cn",
	// 	 'cookie': "authmark="+req.cookies['authmark']+";ids="+req.cookies['ids']
	// })
	// .end(function (err, data) {
	// 	if(!err && data.body.success){
	// 		next();
	// 	}else{
	// 		var result = {
	// 			code: -1,
	// 			msg: '未登录'
	// 		};
	//   		res.json(result);
	// 	}
	// });
}