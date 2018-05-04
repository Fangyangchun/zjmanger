/**
 * query字符串转为对象
 */
 var unparam = function(str, sep, eq) {
    str = (str + "").trim();
    sep = sep || "&";
    eq = eq || "=";

    var ret = {},
        eqIndex,
        pairs = str.split(sep),
        key,
        val,
        i = 0,
        length = pairs.length;

    if (!str) {
        return ret;
    }

    for (; i < length; ++i) {
        eqIndex = pairs[i].indexOf(eq);
        if (eqIndex == -1) { // 没有=
            key = decode(pairs[i]);
            val = undefined;
        } else {
            // remember to decode key!
            key = decode(pairs[i].substring(0, eqIndex));
            val = pairs[i].substring(eqIndex + 1);
            try {
                val = decode(val);
            } catch (e) {
                error(e + val);
            }
        }
        ret[key] = val;
    }
    return ret;
},
decode = function(s) {
    return decodeURIComponent(s.replace(/\+/g, " "));
},
checkPhone=function (value,name){ 
    var phone =value;
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        // alert("手机号码有误，请重填");
        layer.msg("手机号码有误，请重填") 
        // $(this).val("");
        $('input[name="'+name+'"]').val("")
        // return false; 
    } 
},
isString = function(obj){
	var result = false;
	if(typeof(obj) == 'string'){
    	result = true;
	}
	return result;
},
getQueryParam = function(name, url) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = url? url.substr(1).match(reg) : window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return decodeURI(r[2]); return null; //返回参数值
},
getUrlParam=function (url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = url.split('?')[1].substr(0).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
},
substitute = function(obj, data){
	return $(obj).replaceWith(Handlebars.compile($(obj).html())(data));
},
setQueryParam = function (url, name, value) {
	var r = url, url = url.toString();
	if (r != null && r != 'undefined' && r != "") {
	value = encodeURIComponent(value);
	var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
	var tmp = name + "=" + value;
	if (url.match(reg) != null) {
	 r = url.replace(eval(reg), tmp);
	}
	else {
	 if (url.match("[\?]")) {
	  r = url + "&" + tmp;
	 } else {
	  r = url + "?" + tmp;
	 }
	}
	}
	return r;
},
layer_open = function(title,url,w,h){
	if (title == null || title == '') {
		title=false;
	};
	if (url == null || url == '') {
		url="404.html";
	};
	if (w == null || w == '') {
		w=800;
	};
	if (h == null || h == '') {
		h=($(window).height() - 50);
	};
	layer.open({
		type: 2,
		area: [w+'px', h +'px'],
		fix: false, //不固定
		maxmin: true,
		shade:0.4,
		title: title,
		content: url
	});
},
layer_close = function (){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);

},
layer_confirm = function(title,url,data){
	layer.confirm(title, function(index){
	  //do something
	  request(url, data).done(function(){
	  		layer.close(index);
	  		location.reload();
	  })
	});  
},
layer_confirm1 = function(title,url,data){
	layer.confirm(title, function(index){
	  //do something
	  request(url, data).done(function(){
	  		layer.close(index);
	  		window.parent.location.reload();
	  })
	});  
},
layer_msg = function(title){
	layer.msg(title, function(){
 
	});  
},
layer_load = function(){
	layer.load(1,{
    	shade: [0.3,'#000'] //0.1透明度的白色背景
	});
},
setCookie=function(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
},
getCookie=function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
},
delCookie=function(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
},
request = function(url, data) {
	
    var defer = $.Deferred(), 
    options = {
        type: 'post',
        dataType: "jsonp",
        jsonp: 'callback',
        timeout: 15000,
        load: true,
        showMsg: true
    },
    loadPop = options.load? layer.load() : "";
    if (typeof url === "object") {
        options = $.extend(options, url);
    } else {
        $.extend(options, {
            url: url,
			data: data
        });
    }

    data = options.data || {};
    url = options.url.trim();
    if (isString(data)) {
        data = unparam(data);
    }

    options.url = url;

    // $._apiClient.buildData(extras)
    // options.data = $.extend({token: getCookie("token")}, data);
    options.data= $._apiClient.buildData(data);
    // options.data= data
    $.ajax(options).done(function(response) {
    	// console.log(response)
        if (typeof (response) == "string") {
            response = eval("(" + response + ")");
        }

        if (response.success==true) {
            defer.resolve(response, options);
        } 
        // else if(response.success==false){
        // 	layer.alert(response.msg);
        // }
      else {
        	response.msg = response.msgInfo || "服务器出错，请稍后再试";
        	if(response.msgCode==5){
        		layer.alert(response.msg);
        		location.href="/login"
        	}
        	if(options.showMsg){
	    		layer.alert(response.msg);
	    	}

            defer.reject(response, options);
        }
    }).fail(function(xhr, status, err) {

    	xhr.msg = xhr.status==404? "服务器地址错误" : "服务器出错，请稍后再试";
    	if(options.showMsg){
    		layer.alert(xhr.msg);
    	}
        defer.reject(xhr, options);
    }).always(function(){
    	layer.close(loadPop);
    })
    return defer.promise();
},
previewPic = function(element){
	var target = element || $(".photo-img-box img"),
		src;
		
	target.on("click", function(){
		src = $(this).attr("src").split("@")[0];
        img = document.createElement("img");
        img.onload = function(){
            layer_alert('<img style="width:500px" src="'+$(this).attr("src").split("@")[0]+'">');
			$(".layui-layer").css({
				"width": "auto",
				"max-width": "750px"
			})
			$(".layui-layer-content").css({
				"overflow-y": "scroll"
			})
        };
        img.src = src;  
		
	})
},
randerPic = function(selector){
	var obj = selector || ".zoomPic",
		width, height, src, o;
	$(obj).each(function(){
		o = $(this);
		width = o.attr("width") || 80;
		if(o.data("src")){
			src = o.data("src").replace("qyb-img", "img-qyb-process") + "@"+width+"w";
			o.attr("src", src);
			o.removeAttr("data-src");
		}
	})
},
delHtmlTag = function(str){
	return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
},
// 分页
splitPageHtml = function(divId, formId, totalRow, pageSize, pageNumber, totalPages, isSelectPage, isSelectSize){
	var i18n_common_splitPage_altogether = '共';
	var i18n_common_splitPage_jump = '跳转到第';
	var i18n_common_splitPage_jumpPage = '页';
	var i18n_common_splitPage_next = '下一页';
	var i18n_common_splitPage_noJump = '无跳转数据';
	var i18n_common_splitPage_perPage = '每页';
	var i18n_common_splitPage_previous = '上一页';
	var i18n_common_splitPage_records = '条记录';
	var i18n_common_splitPage_strip = '条';


	var data = $("#" + formId).serialize();
	var splitStr = '<ul>';
	if (pageNumber == 1 || totalPages == 0) {
		splitStr += '<li><a href="javascript:void(0)">' + i18n_common_splitPage_previous + '</a></li>';
	} else {
		splitStr += '<li><a href="?'+data+'&pageIndex='+ (pageNumber - 1) +'">' + i18n_common_splitPage_previous + '</a></li>';
	}
	
	for (var i = 1; i <= totalPages; i++) {
		// alert(totalPages)
        if (i == 2 && pageNumber - 4 > 1) {
        	splitStr += '<li><a href="javascript:void(0)">...</a></li>';
            i = pageNumber - 4;
        } else if (i == pageNumber + 4 && pageNumber + 4 < totalPages) {
        	splitStr += '<li><a href="javascript:void(0)">...</a></li>';
            i = totalPages - 1;
        } else {
            if (pageNumber == i) {
            	splitStr += '<li class="active"><a href="javascript:void(0)">' + pageNumber + '</a></li>';
            } else {
            	splitStr += '<li><a href="?'+data+'&pageIndex='+i+'">';
            	splitStr += i;
            	splitStr += '</a></li>';
            }
        }
    }
	
	if (pageNumber == totalPages || totalPages == 0) {
		splitStr += '<li><a href="javascript:void(0)">' + i18n_common_splitPage_next + '</a></li>';
	} else {
		splitStr += '<li><a href="?'+data+'&pageIndex='+ (pageNumber + 1) +'">' + i18n_common_splitPage_next + '</a></li>';
	}
	
	splitStr += '</ul>';
	return splitStr;
},
initPage = function(splitPage){	

	var divId = "content"; 													//分页显示div
	var formId = "splitPage"; 												//分页formId
	var splitPageDiv = "splitPageDiv"; 										//分页输出显示的div
	
	var totalRow = splitPage.count;											//总行数
	var pageSize = 10;														//每页显示多少条
	var pageNumber = splitPage.pageIndex;									//当前第几页 
	var totalPages = parseInt((splitPage.count+pageSize-1)/pageSize);		//总页数 
	var isSelectPage = true;												// 是否显示第几页
	var isSelectSize = true;											    // 是否显示每页显示多少条
	var istotalRow = true;													//是否显示总行数

	// 获取分页HTML信息
	var splitStr = splitPageHtml(divId, formId, totalRow, pageSize, pageNumber, totalPages, isSelectPage, isSelectSize);
	// 显示分页信息
	$("#" + splitPageDiv).html(splitStr);
},
getLocationList = function(list){
	var locationObj = list, resultAddress=[], address;
	for(var i=0;i<locationObj.length;i++){
		(function(i){
		if(locationObj[i].location.split(",")[0]!="null"){
			map.locationToAddress(locationObj[i].location, function(result){
				address = result.regeocode? result.regeocode.formattedAddress : "";
				$(".location").eq(i).text(address);
			});
		}
		})(i)
	}
},
getTimeList = function(className){
	var list = $(className), date;
	for(var i=0;i<list.length;i++){
		date = $(className).eq(i).data("time");
		if(date){

			$(className).eq(i).text(moment(date).format('YYYY-MM-DD'));
		}
	}
},
getTimeList2 = function(className){
	var list = $(className), date;
	for(var i=0;i<list.length;i++){
		date = $(className).eq(i).data("time");
		// alert(date)
		if(date){
			// $(className).eq(i).text(moment.unix(date/1000).format('YYYY-MM-DD hh:mm:ss'))
			$(className).eq(i).text(moment(date).format('YYYY-MM-DD HH:mm:ss'));
		}
	}
},
getTime = function(val,className){
	var date=$(val).val();
	date = new Date(Date.parse(date.replace(/-/g, "/")));
	date = date.getTime()/1000;
	$(className).val(date);
},
getTime2 = function(className){
	var nS= $(className).data("time");
	if(nS){
		var date=moment(nS).format('YYYY-MM-DD HH:mm:ss'); 
		$(className).val(date);
	}				
},
getStatusList = function(statusList){
	var list = $(".status1"),status,statusName;
	for(var i=0;i<list.length;i++){
		status = list.eq(i).data("status");
		for(var j=0;j<statusList.length;j++){
			if(status-1== j){
				statusName = statusList[j];
				list.eq(i).text(statusName);
				break;
			}
		}
	}
},
getStatusList2 = function(statusList){
	var list = $(".status2"),status,statusName;
	for(var i=0;i<list.length;i++){
		status = list.eq(i).data("status");
		// status
		// console.log(status)
		if(status.length){
			status = list.eq(i).data("status").split(',');
			// status = list.eq(i).data("status");
			for(var j=0;j<status.length;j++){
				var status1=status[j]
				// console.log(status1)
				// alert(status1)
				for(var a=0;a<statusList.length;a++){
					if(status1-1== a){
						if(a==1){
							statusName=statusList[a]
						}else{
							statusName=statusName+','+statusList[a]
						}
						// statusName = statusName+statusList[a];
						break;
					}
				}
				
				
			}
			// console.log(statusName)
			list.eq(i).text(statusName);
			
		}else{
			for(var j=0;j<statusList.length;j++){
				if(status-1== j){
					statusName = statusList[j];
					list.eq(i).text(statusName);
					break;
				}
			}
		}
		// console.log(statusList)
		
		
	}
},
getStatusList1 = function(statusList){
	var list = $(".status1"),status,statusName;
	for(var i=0;i<list.length;i++){
		status = list.eq(i).data("status");
		// alert('aa')
		for(var j=0;j<statusList.length;j++){
			if(status== j){
				statusName = statusList[j];
				list.eq(i).text(statusName);
				break;
			}
		}
	}
},
getList = function(className,data){
	for (var i = 0; i <$(className).length; i++) {
		var v=$(className).eq(i).val()
		if(v==data){
			// alert('a')
			$(className).eq(i).attr("selected","selected");
		}
	}
},
getStatus = function(statusList){
	var list = $(".status"),status,statusName;
	for(var i=0;i<list.length;i++){
		status = list.eq(i).data("status")+1;
		for(var j=0;j<statusList.length;j++){
			if(status== j){
				statusName = statusList[j];
				list.eq(i).text(statusName);
				break;
			}
		}
	}
},
getStatus11 = function(statusList){
	var list = $(".status"),status,statusName;
	for(var i=0;i<list.length;i++){
		status = list.eq(i).data("status")+2;
		for(var j=0;j<statusList.length;j++){
			if(status== j){
				statusName = statusList[j];
				list.eq(i).text(statusName);
				break;
			}
		}
	}
},
getCount = function(statusList){
	var list = $(statusList),status;
	for(var i=0;i<list.length;i++){
		status = list.eq(i).data("count")/10000;
		list.eq(i).text(status+"（万元）");
		// console.log(status)
	}
},

// getStatus1= function(statusList){
// 	var list = $(".marriage"),status,statusName;
// 	for(var i=0;i<list.length;i++){
// 		status = list.eq(i).data("status");
// 		for(var j=0;j<statusList.length;j++){
// 			if(status== j){
// 				statusName = statusList[j];
// 				list.eq(i).text(statusName);
// 				break;
// 			}
// 		}
// 	}
// },
// getStatus2= function(statusList){
// 	var list = $(".education"),status,statusName;
// 	for(var i=0;i<list.length;i++){
// 		status = list.eq(i).data("status");
// 		for(var j=0;j<statusList.length;j++){
// 			if(status== j){
// 				statusName = statusList[j];
// 				list.eq(i).text(statusName);
// 				break;
// 			}
// 		}
// 	}
// },
// getSexList = function(statusList){
// 	var list = $(".sex"),status,statusName;
// 	for(var i=0;i<list.length;i++){
// 		status = list.eq(i).data("status");
// 		for(var j=0;j<statusList.length;j++){
// 			if(status == j){
// 				statusName = statusList[j];
// 				list.eq(i).text(statusName);
// 				break;
// 			}
// 		}
// 	}
// },
previewPic = function(element){
	var target = element || $(".photo-img-box img"),
		src;
		
	target.on("click", function(){
		src = $(this).attr("src").split("@")[0];
        img = document.createElement("img");
        img.onload = function(){
            layer.alert('<img style="width:500px" src="'+$(this).attr("src").split("@")[0]+'">');
			$(".layui-layer").css({
				"width": "auto",
				"max-width": "750px"
			})
			$(".layui-layer-content").css({
				"overflow-y": "scroll"
			})
        };
        img.src = src;  
		
	})
},
/**
 * 图片上传
 * @param fileNumLimit 	上传图片最大数量
 * @param thumbnailId	缩略图id
 * @param inputId		隐藏input id
 * @param showType		显示样式
 */
uploadeImg = function(fileNumLimit, thumbnailId, inputId, showType, element){
	var fileNum = $("#"+thumbnailId).find(".photo-box").length;
	if(fileNum >= fileNumLimit){
		alert("最多上传"+fileNumLimit+"张图片");
		return false;
	}
	fileNumLimit = fileNumLimit - fileNum;
	if(element){
		var uploadBtn = $(element).attr("id");
	}
	layer_open("图片上传", "/cms/common/uploader?fileNumLimit="+fileNumLimit+"&thumbnailId="+thumbnailId+"&inputId="+inputId+"&showType="+showType+"&uploadBtn="+uploadBtn,564,500);
},

// 图片删除
removeImg = function(obj, inputId, fileNumLimit){
	var thisBox = $(obj).parents(".photo-box");
	var thisUrl = thisBox.find("img").attr("src");
	var addBtn = thisBox.parent().parent().children(".add-btn");
	if(inputId){
		$("#"+inputId).val($("#"+inputId).val().replace(thisUrl, ""));
	}
	thisBox.remove();
	if(fileNumLimit){
		if(thisBox.find("img").length <= fileNumLimit){
			$("#"+inputId).siblings('div[data-limit="'+fileNumLimit+'"]').show();
			addBtn.show();
		}
	}
	
},
/**
 * 文件上传
 * @param fileNumLimit 	上传文件最大数量
 * @param thumbnailId	文件id
 * @param inputId		隐藏input id
 * @param showType		显示样式
 */
uploadFile = function(fileNumLimit, thumbnailId, inputId, showType, element){
	var fileNum = $("#"+thumbnailId).find(".file-item").length;
	if(fileNum >= fileNumLimit){
		alert("最多上传"+fileNumLimit+"个文件");
		return false;
	}
	fileNumLimit = fileNumLimit - fileNum;
	if(element){
		var uploadBtn = $(element).attr("id");
	}
	layer_open("添加附件", "/cms/common/uploadFile?fileNumLimit="+fileNumLimit+"&thumbnailId="+thumbnailId+"&inputId="+inputId+"&showType="+showType+"&uploadBtn="+uploadBtn,564,500);
},
// 文件删除
removeFile = function(obj, inputId, fileNumLimit){
	var thisBox = $(obj).parents(".photo-box");
	var thisUrl = thisBox.find("i").data("src");
	if(inputId){
		$("#"+inputId).val($("#"+inputId).val().replace(thisUrl, ""));
	}
	thisBox.remove();
	if(fileNumLimit){
		if($(".file-box i").length <= fileNumLimit){
		 	$(".file-upload-btn").show();
		}
	}
	
},
map = {
	locationToAddress: function(location, callback){
		var geocoder = new AMap.Geocoder();
		//逆地理编码
		var lnglatXY=location.split(",");//地图上所标点的坐标
		geocoder.getAddress(lnglatXY, function(status, result) {
		    if (status === 'complete' && result.info === 'OK') {
		    	callback(result);
		       //获得了有效的地址信息:
		       //即，result.regeocode.formattedAddress
		    }else{
		    	callback("获取地址失败");
		       //获取地址失败
		    }
		}); 
	},
	//根据经纬度获取地理位置名称
	getAddressName: function(map, lnglatXY){
	    function regeocoder() {  //逆地理编码
	        var geocoder = new AMap.Geocoder({
	            radius: 1000,
	            extensions: "all"
	        });        
	        geocoder.getAddress(lnglatXY, function(status, result) {
	            if (status === 'complete' && result.info === 'OK') {
	                geocoder_CallBack(result);
	            }
	        });        
	        var marker = new AMap.Marker({  //加点
	            map: map,
	            position: lnglatXY
	        });
	        map.setFitView();
	    }
	    function geocoder_CallBack(data) {
	        var address = data.regeocode.formattedAddress; //返回地址描述
	        //console.log(address);
	        $("#addressName").val(address);
	    }
	    regeocoder();
	},
	//获取用户所在城市信息
	showCityInfo: function(map) {
	    //实例化城市查询类
	    var citysearch = new AMap.CitySearch();
	    //自动获取用户IP，返回当前城市
	    citysearch.getLocalCity(function(status, result) {
	        if (status === 'complete' && result.info === 'OK') {
	            if (result && result.city && result.bounds) {
	                var cityinfo = result.city;
	                var citybounds = result.bounds;
	                //document.getElementById('tip').innerHTML = '您当前所在城市：'+cityinfo;
	                //地图显示当前城市
	                map.setBounds(citybounds);
	            }
	        } else {
	            //document.getElementById('tip').innerHTML = result.info;
	        }
	    });
	},
	// 浏览器定位
	geolocation: function(map){
		var _this = this;
		map.plugin('AMap.Geolocation', function() {
	        geolocation = new AMap.Geolocation({
	            enableHighAccuracy: true,//是否使用高精度定位，默认:true
	            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
	            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	            buttonPosition:'RB'
	        });
	        map.addControl(geolocation);
	        geolocation.getCurrentPosition();
	        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
	        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
	    });
	    //解析定位结果
	    function onComplete(data) {
	    	map.clearMap();
	    	_this.getAddressName(map, [data.position.getLng(), data.position.getLat()]);
	    	$("#addressPoint").val(data.position.getLng() + "," +data.position.getLat());
	    	_this.locationToAddress(data.position.getLng() + "," +data.position.getLat(), function(result){
	        	$("#addressCode").val(result.regeocode.addressComponent.adcode);
	        });
	    }
	    //解析定位错误信息
	    function onError(data) {
	    	map.clearMap();
	    	console.log(data);
	        _this.showCityInfo(map);
	    }
	},
	// 点选坐标
	getPoint: function(map){
		var _this = this;
		var clickEventListener = map.on('click', function(e) {
			map.clearMap();
			setPoint(map, [e.lnglat.getLng(), e.lnglat.getLat()]);
			_this.getAddressName(map, [e.lnglat.getLng(), e.lnglat.getLat()]);
	        $("#addressPoint").val(e.lnglat.getLng()+","+e.lnglat.getLat());
	        _this.locationToAddress(e.lnglat.getLng()+","+e.lnglat.getLat(), function(result){
	        	$("#addressCode").val(result.regeocode.addressComponent.adcode);
	        });
	    });
	    function select(e) {
	        if (e.poi && e.poi.location) {
	            map.setZoom(15);
	            map.setCenter(e.poi.location);
	        }
	    }
	    function setPoint(map, point){
			var marker = new AMap.Marker({
			        position: point
			    });
			    marker.setMap(map);
			    map.setZoomAndCenter(16, point);
		}
	},
	init: function(location, callback){
		var savePoint = $(location).val();
		var windowsArr = [];
	    var marker = [];
	    var center = savePoint? savePoint.split(",") : [116.397428, 39.90923];
	    var mapObj = new AMap.Map("mapContainer", {
	            resizeEnable: true,
	            center: center,//地图中心点
	            zoom: 13,//地图显示的缩放级别
	            keyboardEnable: false
	    });

	    if(!savePoint){
	    	map.geolocation(mapObj);
	    }
	    
	    
	    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
	      var autoOptions = {
	        input: "keyword"//使用联想输入的input的id
	      };
	      autocomplete= new AMap.Autocomplete(autoOptions);
	      var placeSearch = new AMap.PlaceSearch({
	            city:'',
	            map:mapObj
	      })
	      $(".btn-search").on("click", function(){
	          autocomplete.search($("#keyword").val(), function(status, result){
	            //TODO:开发者使用result自己进行下拉列表的显示与交互功能
	          });
	      })
	      AMap.event.addListener(autocomplete, "select", function(e){
	         //TODO 针对选中的poi实现自己的功能
	        AMap.service('AMap.Geocoder',function(){//回调函数
		        //实例化Geocoder
		        geocoder = new AMap.Geocoder({
		            city: ""//城市，默认：“全国”
		        });
		        //TODO: 使用geocoder 对象完成相关功能
	            var location = [e.poi.location.lng, e.poi.location.lat];
	            geocoder.getAddress(location, function(status, result) {
	                if (status === 'complete' && result.info === 'OK') {
	                    //TODO:获得了有效经纬度，可以做一些展示工作
	                    //比如在获得的经纬度上打上一个Marker
	                    //placeSearch.search(e.poi.name)
	                    mapObj.clearMap();
	                    var point = location;
	                    var marker = new AMap.Marker({
	                        position: point
	                    });
	                    marker.setMap(mapObj);
	                    mapObj.setZoomAndCenter(16, point);
	                    $("#addressPoint").val(point[0]+","+point[1]);
	                    $("#addressName").val(result.regeocode.formattedAddress);
	                    map.locationToAddress(point[0]+","+point[1], function(result){
	                    	console.log(result);
				        	$("#addressCode").val(result.regeocode.addressComponent.adcode);
				        });
	                    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
	                        var toolBar = new AMap.ToolBar();
	                        var scale = new AMap.Scale();
	                        mapObj.addControl(toolBar);
	                        mapObj.addControl(scale);
	                    })
	                }else{
	                    //获取经纬度失败
	                }
	            }); 
		    })
	      });
	    });
		
		map.getAddressName(mapObj, center);

		map.getPoint(mapObj);

		callback();
	}
}
$(document).ready(function(){
	Handlebars.registerHelper("equal",function(v1,v2,options){
		if(v1==v2){
			//满足添加继续执行
			return options.fn(this);
		}else{
			//不满足条件执行{{else}}部分
			return options.inverse(this);
		}
    });
})