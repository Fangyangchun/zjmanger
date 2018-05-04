
module.exports = {
   
    port: 9100,
    proxy: {
    	host: "mtop.foxsee.com",
    	port: 8082
    },
    oss: {
		
		accessKeyId: 'LTAIE1pCXa5f6Bdk',
		accessKeySecret: 'sD4qxou4HD3tJYU4WyPb05DUJBdSrv',
		
		endpoint: "http://oss-cn-hangzhou.aliyuncs.com/",
	
		bucket: 'zhongji-img1',
		region: 'oss-cn-hangzhou',

		returnUrl: 'http://img1.zhongjing-hz.com/',
		// rootPath: 'modernstatic/',
		rootPath: 'economics/7/',
		
		policyText : {
		    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
		    "conditions": [
		    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
		    ]
		},
		localPath: "/Users/moongood/Desktop/zjmanager/public"
	}
};