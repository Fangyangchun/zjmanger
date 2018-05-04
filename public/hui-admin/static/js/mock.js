Mock.mock('/mock/staff/getList', {
    status: 0,
    data: {
        'count': 22,                                          
        'staffList|22': [  
            {
                'uid': '8a40c0353fa828a6013fa898d4ac0020',
                'userName': '@name',       
                'phone': '@natural',
                'idCardNo': '330104199006303333',
                'email': 'abc@xx.com',
                'manageArea': '@natural',
                'status|1-2': 1,
                'addTime': "@datetime"
            }
        ]
    }
}).mock('/mock/staff/delete', {
    status: 0,
}).mock('/mock/staff/changeStatus', {
    status: 0,
}).mock('/mock/staff/add', {
    status: 0,
}).mock('/mock/staff/edit', {
    status: 0,
}).mock('/mock/staff/getDetail', {
    status: 0,
    data: {
        "staffDetail": {
            'uid': '8a40c0353fa828a6013fa898d4ac0020',
            'userName': '@name',       
            'phone': '@natural',
            'idCardNo': '330104199006303333',
            'email': 'abc@xx.com',
            'manageArea': '@natural',
            'status|1-2': 1,
            'addTime': "@datetime"
        }
    }
}).mock('/mock/user/getList', {
    status: 0,
    data: {
        'count': 22,                                          
        'userList|22': [  
            {
                'uid': '8a40c0353fa828a6013fa898d4ac0020',
                'phone': '@natural',
                'nickName': '@nickname',       
                'portrait' : '@portrait',
                'name' : '@name',
                'idCardNo' : '33010419900630333',
                'type|1-3 ': 1,
                'source|1-2' :1,
                'status|1-4' : 1,
                'addTime' :'@datetime',
                'sex|1-2' : 1,
                'age|8-100':100,
                'industry' : '用户行业',
                'education ': '学历',
                'department' : '所属部门',
                'manageArea' :'@natural',
                'score':'999',
                'email':'@region'
                
            }
        ]
    }
}).mock(/mock\/umbrella\/category\/list/,{
    status: 0,
    data: {
         categoryList: [
            {
                "categoryNo": "A01001",
                "categoryName": "招行",
                "categoryAlias": "wandaguangchang",
                "categoryPicture": null,
                "categoryDesc": null,
            }
        ],
    }
}).mock(/mock\/umbrella\/category\/umb\/info/, {
      status: 0,
      data: {
        category: {
          "categoryNo": "A01005",
          "categoryName": "万达广场",
          "categoryAlias": "wandaguangchang",
          "categoryPicture": "http://lib.h-ui.net/jquery.SuperSlide/2.1.1/demo/03/images/banner-1.jpg,http://lib.h-ui.net/jquery.SuperSlide/2.1.1/demo/03/images/banner-1.jpg,http://lib.h-ui.net/jquery.SuperSlide/2.1.1/demo/03/images/banner-1.jpg",
          "categoryDesc": "desc"
        },
        "surfaceList|22":[
          {
            "surfaceNo": "0002",
            "num": 1
          }
        ]
      }
}).mock('/mock/umbrella/category/add', {
    status: 0,
    
}).mock('/mock/umbrella/category/update', {
    status: 0,
    
}).mock('/mock/umbrella/category/delete', {
    status: 0,
}).mock('/mock/umbrella/umb/move/surface', {
    status: 0,
    
}).mock(/mock\/umbrella\/umb\/status\/list/, {
  "status": 0,
  "msg": "",
  "data": {
    "statusList": [
      {
        "msg": "未投放",
        "code": 0
      },
      {
        "msg": "待使用",
        "code": 1
      },
      {
        "msg": "已预约",
        "code": 2
      },
      {
        "msg": "使用中",
        "code": 3
      },
      {
        "msg": "调度中",
        "code": 4
      },
      {
        "msg": "故障中",
        "code": 5
      },
      {
        "msg": "维修中",
        "code": 6
      },
      {
        "msg": "已报废",
        "code": 7
      }
    ]
  }
}).mock(/mock\/umbrella\/umb\/list/, {
      "status": 0,
      "msg": "",
      "data": {
        "umbrellaList|2": [
          {
            "id": 1,
            "umbNo": "10001",
            "qrCode":'@datetime',
            "siteNo": null,
            "model": '@datetime',
            "status|0-7": 0,
            "prevOrderId": null,
            "orderId": null,
            "linkType": null,
            "linkNo": null,
            "categoryNo": "0",
            "bluetoothAddress": null,
            "bluetoothKey": null,
            "lastTime": null,
            "version": 2,
            "batch": 1,
            "surfaceNo": "0001",
            "addTime": "1499937781",
            "updateTime": null,
            "scrapTime": null
          }
          
        ],
        "total": 2
      }
}).mock(/mock\/umbrella\/umb\/surface\/list/, {
  "status": 0,
  "msg": "",
  "data": {
    "surfaceList|4": [
      {
        "surfaceNo": "0002",
        "num": 1,
        "addTime": "1499937781"
      },
      {
        "surfaceNo": "0001",
        "num": 1,
        "addTime": "1499937781"
      }
    ],
    "count": 2
  }
}).mock(/mock\/umbrella\/umb\/today\/import/, {
  "status": 0,
  "msg": "",
  "data": {
    "importList": [
      {
        "importNo": "202837299237486663",
        "num": 1,
        "addTime": 1499937781
      }
    ]
  }
}).mock('/mock/umbrella/umb/today/delete', {
  "status": 0,
  "msg": "",
  "data": null
}).mock('/mock/umbrella/umb/update', {
    status: 0,
}).mock('/mock/umbrella/umb/delete', {
  "status": 0,
  "msg": "",
  "data": null
}).mock('/mock/umbrella/umb/add', {
  "status": 0,
  "msg": "",
  "data": 1
}).mock(/mock\/umbrella\/umb\/version\/list/, {
  "status": 0,
  "msg": "",
  "data": {
    "versionList": [
      "1",
      "0034"
    ]
  }
}).mock(/mock\/umbrella\/umb\/batch\/list/, {
  "status": 0,
  "msg": "",
  "data": {
    "batchList": [
      "1",
      "002"
    ]
  }
}).mock('/mock/umbrella/getDetail', {
    status: 0,
    data: {
        "umbrellaDetail": {
            'umbNo':'3301041990', //成品编码
            'categoryNo': '@name', //伞型号
            'deviceCode':'@datetime',  //设备码
            'QRCode':'@datetime',  //二维码地址
            'addTime' :'@datetime', //上传时间
            'batch' :1, //批次
            'crafts':'中国是世界上最早发明雨伞的国家，伞是中国劳动人民一个重要的创造。 当时被人们称之为“簦”。上至皇帝出行的黄色罗伞，下至百姓的避雨工具，可以说伞与人们的生活息息相关。受中国文化影响，亚洲许多国家很早就有使用伞的传统，而欧洲至16世纪才开始风靡中国伞。',//工艺描述
            'picture':'a',//伞面图片
            'siteNo' : 1 ,//所属站点
            'version':2  //版本号
        }
    }
}).mock(/mock\/user\/permission\/module\/list/, {
    status: 0,
    data: {
        'count': 22,                                          
        'moduleList|22': [  
            {
                'moduleNo': 'module',
                'moduleName': '@cname'
            }
        ]
    }
}).mock(/mock\/user\/permission\/module\/info/, {
    status: 0,
    data: {
        info: {
            'moduleNo': "8a40c0353fa828a6013fa898d4ac0020",
            'moduleName': '@cname'
        }
    }
}).mock('/mock/user/permission/module/delete', {
    status: 0,
}).mock('/mock/user/permission/module/add', {
    status: 0,
}).mock('/mock/user/permission/module/update', {
    status: 0,
}).mock(/mock\/user\/permission\/element\/list/, {
    status: 0,
    data: {
        'count': 22,                                          
        'elementList|22': [  
            {
                'id|1-10': 1,
                'moduleNo': "module_001",
                'moduleName': '@cname',
                'eleName': '@cname',
                'elePath': '@url'
            }
        ]
    }
}).mock(/mock\/user\/permission\/element\/info/, {
    status: 0,
    data: {
        info: {
            'id': "8a40c0353fa828a6013fa898d4ac0020",
            'moduleNo': 'module',
            'moduleName': '@cname',
            'eleName': '@cname',
            'elePath': '@url'
        }
    }
}).mock('/mock/user/permission/element/delete', {
    status: 0,
}).mock('/mock/user/permission/element/add', {
    status: 0,
}).mock('/mock/user/permission/element/update', {
    status: 0,
}).mock(/mock\/user\/permission\/role\/list/,{
    status: 0,
    data: {
        'count': 22,                                          
        'roleList|22': [  
            {
                'id': "8a40c0353fa828a6013fa898d4ac0020",
                'name': '@cname'
            }
        ]
    }
}).mock(/mock\/user\/permission\/role\/info/, {
    status: 0,
    data: {
        info: {
            'id': "8a40c0353fa828a6013fa898d4ac0020",
            'name': '@cname',
            'elementIdList': '1,2,5,8'
        }
    }
}).mock('/mock/user/permission/role/delete', {
    status: 0,
}).mock('/mock/user/permission/role/add', {
    status: 0,
}).mock('/mock/user/permission/role/update', {
    status: 0,
}).mock(/mock\/user\/permission\/role\/web\/list/, {
    status: 0,
    data: {
        'count': 5,                                          
        'roleWebList|5': [  
            {
                "id|1-10": 1,
                "roleId": 5,
                "moduleNo": "module_001",
                "eleId|1-10": 2,
                'eleName': "@cname"
            }
        ]
    }
});