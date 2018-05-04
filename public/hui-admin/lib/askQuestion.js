// var jquery = require("jsdom");
// // require('../lib');
 
    // var jsdom = require('jsdom').jsdom
    //   , $ = require('jquery')
    //   ;
// var cheerio = require('cheerio');
// $ = cheerio.load('<h2 class="title">Hello world</h2>');
// module.exports.jq = function(){
//     // var jsdom = require("jsdom");
//     // var jquery = require('jquery');
//     // var $ = jquery(jsdom.jsdom().parentWindow);
//   	// var u = navigator.userAgent;
//    //  var app = navigator.appVersion;

// }

function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))


        return unescape(arr[2]);
        else
        return null;
    }

	$._browser = {

    versions: function () {
		        var u = navigator.userAgent;
        var app = navigator.appVersion;
        return {
            trident: u.indexOf("Trident") > -1,
            presto: u.indexOf("Presto") > -1,
            webKit: u.indexOf("AppleWebKit") > -1,
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
            mobile: u.match("AppleWebKit") && !u.match("windows"),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            mac: u.indexOf("Mac") > -1,
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
            iPhone: u.indexOf("iPhone") > -1,
            iPad: u.indexOf("iPad") > -1,
            webApp: u.indexOf("Safari") == -1,
            weixin: u.match(/MicroMessenger/i) == "MicroMessenger"
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()

};
      $._apiClient = {
        appId: 7,
        appVersion: "1.0",
        appKey: "web*manager",
        vendorId: 1,
        root: function () {
            var js = window.document.scripts;
            js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/"));
            js = js.substring(0, js.lastIndexOf("/") + 1);
            return js
        }(),
        buildInput: function (inputs) {
            // TODO 定义 sessionId
            // var sessionId = null;
            inputs._appId = $._apiClient.appId;

            if(getCookie('token')){
            	sessionId =getCookie('token')	
            	inputs._se = inputs._se || sessionId;
            }
            // alert(getCookie('ven'))
            if(getCookie('ven')){
                vendorId =getCookie('ven')   
                inputs.vendorId= inputs.vendorId || vendorId;
            }
            // if ($._verify.isEmpty(sessionId)) {
            //     // ignore sessionId
            // } else {
            //     inputs._se = inputs._se || sessionId;
            // }
            inputs.vendorId = $._apiClient.vendorId;
            inputs._sy = inputs._sy || $._apiClient._sy;
            inputs._t = inputs._t || new Date().getTime();
            inputs._v = inputs._v || $._apiClient.appVersion;
            return inputs;
        },
        buildAt: function (inputs) {
            // var params = {};
            // var array = [];
            // var i = 0;
            // var at = "";
            // $.each(inputs, function (name, value) {
            //     params[name] = value;
            //     array[i] = name;
            //     i++;
            // });
            // array.sort();
            // for (var ele in array) {
            //     at += array[ele];
            //     at += params[array[ele]];
            // }
            // return $.md5($.md5(at) + $._apiClient.appKey);
            var params = {};
            var array=new Array();
            var i=0;
            var at="";
            $.each(inputs, function(name, value) {
                //file_id， message， itemName， content， descript， title,serviceInfo
                 if (name !=="message" && name!=="itemName" && name!=="content"  && name!=="descript" && name!=="title" &&name!=="upfile") { //长字符串和emoji不参与
                    if (value !== '' && value !== null && typeof(value) != "undefined") {
                     params[name] = value;
                     array[i]=name;
                     i++;
                    }
                 }
                 
            });
            array.sort();
            for(var ele in array){
                at += array[ele];
                at += params[array[ele]];
            } 
            //console.log(at);
            return $.md5($.md5(at) + $._apiClient.appKey);
        },
        buildData: function (inputs) {
            var _business = $.param($._apiClient.buildInput(inputs));
            var _at = $._apiClient.buildAt(inputs);
            var data = _business + "&_at=" + _at;
            return data;
        },
        address: function () {

            var url;
            var currentDomain = window.location.host;
            url=currentDomain
            
            return url;
        }(),
        _device: function () {
            var device = "";
            if ($._browser.versions.android) {
                device = "android";
            } else if ($._browser.versions.ios) {
                device = "ios";
            } else if ($._browser.versions.mobile) {
                device = "mobile";
            }
            return device;
        }(),
        _sy: function () {

            var device = this._device;
            var host = window.location.host;
            var width = window.screen.width;
            var height = window.screen.height;

            // TODO: 此处的拼接规则死板,应该动态的生成.
            return "7||1||" + width + "*" + height + "||" + device + "||4||" + host;
        }(),
    };
   