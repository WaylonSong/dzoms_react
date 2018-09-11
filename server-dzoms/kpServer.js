module.exports = function(app){
	var path = require('path')
  var basePath = path.resolve(__dirname, '..')
    app.get("/proManagement", function(req, res) {
      res.sendFile(basePath + '/pages/proManagement.html')
    })

    app.get("/assignResponsibility", function(req, res) {
      res.sendFile(basePath + '/pages/assignResponsibility.html')
    })

    app.get("/test", function(req, res) {
      res.sendFile(basePath + '/pages/test.html')
    })

    app.get("/personalPerformance", function(req, res) {
      res.sendFile(basePath + '/pages/personalPerformance.html')
    })

    app.get("/bumenkp", function(req, res) {
      res.sendFile(basePath + '/pages/bumenkp.html')
    })

    app.get("/historykp?*", function(req, res) {
      res.sendFile(basePath + '/pages/historykp.html')
    })

    app.get("/managementkp", function(req, res) {
      res.sendFile(basePath + '/pages/managementkp.html')
    })

    app.get("/monthSummarySheet", function(req, res) {
      res.sendFile(basePath + '/pages/monthSummarySheet.html')
    })

    app.get("/yearSummarySheet", function(req, res) {
      res.sendFile(basePath + '/pages/yearSummarySheet.html')
    })

    app.get("/kpHistoryInfor", function(req, res) {
      res.sendFile(basePath + '/pages/kpHistoryInfor.html')
    })

    app.get(["/person"], function(req, res) {
      res.send(
        [{"uid":16,"uname":"金山","upwd":"123","department":"运营管理部","position":"一公司经理"},
         {"uid":17,"uname":"王晓华","upwd":"123","department":"运营管理部","position":"证照员"},
         {"uid":19,"uname":"季兴仁","upwd":"123","department":"运营管理部","position":"安全员"},
         {"uid":21,"uname":"郭庆辉","upwd":"123","department":"运营管理部","position":"二公司经理"},
         {"uid":22,"uname":"李志强","upwd":"123","department":"运营管理部","position":"宣传副经理"},
         {"uid":27,"uname":"吕文虎","upwd":"123","department":"运营管理部","position":"安全员"},
         {"uid":29,"uname":"邹研","upwd":"123","department":"综合办公室","position":"办公室副主任"},
         {"uid":30,"uname":"刘波","upwd":"123","department":"综合办公室","position":"办公室主任"},
         {"uid":31,"uname":"汤伟丽","upwd":"123","department":"总经理办公室","position":"副总经理"},
         {"uid":33,"uname":"王星","upwd":"123","department":"总经理办公室","position":"副总经理"},
         {"uid":35,"uname":"赵顺","upwd":"123","department":"综合办","position":"网络工程师"},
         {"uid":36,"uname":"冉铮","upwd":"123","department":"计财部","position":"出纳"},
         {"uid":37,"uname":"孙大勇","upwd":"123","department":"信息部","position":"副总经理"},
         {"uid":38,"uname":"杨爽","upwd":"123","department":"","position":""},
         {"uid":39,"uname":"赵立军","upwd":"123","department":"运营管理部","position":"三公司经理"}
        ]
      )
    })

    app.get(["/hasPersonData/*"], function(req, res) {
      res.send({
        data:[ 
         {"id":15,"score":20},
         {"id":16,"score":30},
         {"id":3,"score":50}
        ],
        status:1
        }    
      )
    })

    app.get(["/historyxinxi"], function(req, res) {
      res.send(
{
  "status": 1,
  "message": "查询成功",
  "data": {
    "personId": 43,
    "personName": "考核组",
    "detail": [{
      "id": 833,
      "name": "赵顺2018-01 生成时间 15:07绩效考核"
    }, {
      "id": 839,
      "name": "赵顺2018-01 生成时间 15:10绩效考核"
    }, {
      "id": 845,
      "name": "赵顺2018-01 生成时间 16:26绩效考核"
    }, {
      "id": 851,
      "name": "冉铮2018-01 生成时间 11:20绩效考核"
    }, {
      "id": 854,
      "name": "刘波2018-01 生成时间 11:43绩效考核"
    }, {
      "id": 857,
      "name": "冉铮2018-01 生成时间 12:17绩效考核"
    }, {
      "id": 860,
      "name": "陈东慧2018-01 生成时间 09:41绩效考核"
    }]
  }
}
      )
    })

    app.get(["/historyxinxi/*"], function(req, res) {
      res.send(
// {
//   "status": 1,
//   "message": "查询成功",
//   "data": {
//     "personId": 43,
//     "personName": "考核组",
//     "detail": [{
//       "id": 833,
//       "name": "赵顺2018-01 生成时间 15:07绩效考核"
//     }, {
//       "id": 839,
//       "name": "赵顺2018-01 生成时间 15:10绩效考核"
//     }, {
//       "id": 845,
//       "name": "赵顺2018-01 生成时间 16:26绩效考核"
//     }]
//   }
// }
{"status":1,"message":"查询成功","data":{"personId":35,"personName":"赵顺","detail":[
  {
      "id": 833,
      "name": "赵顺2018-01 生成时间 15:07绩效考核"
    }

]}}

      )
    })
    
    // app.get(["/historyxinxi/*"], function(req, res) {
    //   res.send({
    //     data:[ 
    //       {
    //         id: '0',
    //         name: '黄嵩凯员工2016-01月绩效考评',
    //       }
    //     ],
    //     status:1
    //     }    
    //   )
    // })

    app.post(["/test"], function(req, res) {
      res.send({
        data:[ 
          {
            id: '0',
            name: '黄嵩凯员工2016-01月绩效考评',
          }
        ],
        status:1
        }    
      )
    })
    //kp month summary sheet 
    app.get(["/monthSummarySheets"], function(req, res) {
      res.send(
        {"status":1,"message":"查询成功","data":[{"name":"陈东慧","department":"计财部","kpScore":{"total":0.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,,,,,,,,,,,"},{"name":"明慧君","department":"计财部","kpScore":{"total":0.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,,,,,,,,,,"},{"name":"夏滨","department":"运营管理部","kpScore":{"total":-8.39,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,,,,,例会出席率加1分；,投诉率扣8分；,违制率扣2.4分；,,安全指标管理扣0.99分；,冰雪大世界出勤加2分,,"},{"name":"尹丽波","department":"运营管理部","kpScore":{"total":0.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,"},{"name":"金山","department":"运营管理部","kpScore":{"total":-3.42,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",银行收费加1分,,,,例会出席加1.6分,,,宣传活动组织加0.4分,,,,安全指标考核扣2.5分,,,,,行业投诉扣10分,乘客满意度加2.08分,冰雪大世界出勤加2分，感动活动节目组织加2分,,"},{"name":"王晓华","department":"运营管理部","kpScore":{"total":0.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,"},{"name":"季兴仁","department":"运营管理部","kpScore":{"total":2.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,冰雪大世界出勤加2分；,"},{"name":"郭庆辉","department":"运营管理部","kpScore":{"total":-4.4,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",银行收费加1分,,,,例会出席加1.7分,,,宣传活动组织加0.4分,,,,安全指标考核加0.5分,,,,,行业投诉扣12.5分,乘客满意度加2.5分,冰雪大世界出勤加2分,,"},{"name":"李志强","department":"信息部","kpScore":{"total":2.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,冰雪大世界出勤加2分；,,"},{"name":"吕文虎","department":"运营管理部","kpScore":{"total":1.4299999999999997,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",银行收费加0.5分；,,,例会出席加0.6分；,,,,,活动组织加0.2分；,,投诉处理扣3.2分；,乘客满意度加0.83分；,,,,冰雪大世界出勤加2分；,岗前培训加0.5分；,,,,,"},{"name":"邹研","department":"综合办公室","kpScore":{"total":-1.5,"lsxgz":0.0,"rcgz":0.0,"xwgf":-0.5},"remarks":",,薪酬计算扣1分,,,,,,,,,,,,,,,,,,,,,,,,,事假半天扣0.5分,,"},{"name":"刘波","department":"综合办公室","kpScore":{"total":1.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,,,冰雪大世界出勤加1分；,"},{"name":"赵顺","department":"信息部","kpScore":{"total":1.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,冰雪大世界出勤加1分；,,"},{"name":"冉铮","department":"计财部","kpScore":{"total":0.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,,,"},{"name":"杨爽","department":"运营管理部","kpScore":{"total":0.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,,,,,,,"},{"name":"赵立军","department":"运营管理部","kpScore":{"total":-10.93,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",银行收费加1分；,,,,例会出席加1.5分,,,宣传活动组织加0.3；,,,,安全指标考核扣1.1分；,,,,,行业投诉扣16.5分；,乘客满意度加1.87分；,冰雪大世界出勤+2,,"},{"name":"胡越","department":"运营管理部","kpScore":{"total":-2.0999999999999996,"lsxgz":0.0,"rcgz":0.0,"xwgf":-1.0},"remarks":",银行收费加0.5分；,,,例会出席加0.5分；,,,,活动组织加0.15分；,,,,,投诉处理扣5分；,乘客满意度加0.75分；,,,,事假1天扣1分；,冰雪大世界出勤加2分；,"},{"name":"刘巍","department":"运营管理部","kpScore":{"total":2.0,"lsxgz":0.0,"rcgz":0.0,"xwgf":0.0},"remarks":",,,,,,,,,,,冰雪大世界出勤加2分；,,"}]}   
      )
    })

    //kp year summary sheet 
    app.get(["/yearSummarySheets"], function(req, res) {
      res.send(
        {"status":1,"message":"查询成功","data":[{"name":"admin","department":"管理员","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"陈东慧","department":"计财部","january":100.0,"february":100.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":100.0,"average":100.0},{"name":"明慧君","department":"计财部","january":100.0,"february":100.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":100.0,"average":100.0},{"name":"夏滨","department":"运营管理部","january":100.0,"february":91.61,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":91.61,"average":99.66},{"name":"尹丽波","department":"运营管理部","january":100.0,"february":100.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":100.0,"average":100.0},{"name":"金山","department":"运营管理部","january":100.0,"february":96.58,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":96.58,"average":99.84},{"name":"王晓华","department":"运营管理部","january":100.0,"february":100.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":100.0,"average":100.0},{"name":"季兴仁","department":"运营管理部","january":100.0,"february":102.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":102.0,"average":100.14},{"name":"郭庆辉","department":"运营管理部","january":100.0,"february":95.6,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":95.6,"average":99.79},{"name":"李志强","department":"信息部","january":100.0,"february":102.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":102.0,"average":100.17},{"name":"吕文虎","department":"运营管理部","january":100.0,"february":101.43,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":101.43,"average":100.06},{"name":"邹研","department":"综合办公室","january":100.0,"february":98.5,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":98.5,"average":99.95},{"name":"刘波","department":"综合办公室","january":100.0,"february":101.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":101.0,"average":100.06},{"name":"汤伟丽","department":"总经理办公室","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"王星","department":"总经理办公室","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"赵顺","department":"信息部","january":100.0,"february":101.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":101.0,"average":100.06},{"name":"冉铮","department":"计财部","january":100.0,"february":100.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":100.0,"average":100.0},{"name":"孙大勇","department":"总经理办公室","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"杨爽","department":"运营管理部","january":100.0,"february":100.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":100.0,"average":100.0},{"name":"赵立军","department":"运营管理部","january":100.0,"february":89.07,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":89.07,"average":99.48},{"name":"胡越","department":"运营管理部","january":100.0,"february":97.9,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":97.9,"average":99.9},{"name":"刘巍","department":"运营管理部","january":100.0,"february":102.0,"march":100.0,"april":100.0,"may":100.0,"june":100.0,"july":100.0,"august":100.0,"september":100.0,"october":100.0,"november":100.0,"december":null,"total":102.0,"average":100.15},{"name":"考核组","department":"考核小组","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"常亮","department":"综合办公室","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"刘江龙","department":"运营管理部","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"王雅君","department":"运营管理部","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null},{"name":"王奇","department":"运营管理部","january":null,"february":null,"march":null,"april":null,"may":null,"june":null,"july":null,"august":null,"september":null,"october":null,"november":null,"december":null,"total":null,"average":null}]}    
      )
    })

    app.get(["/bumenkaoPing"], function(req, res) {
      res.send(
      //考核组退回
      // {
      //   "status": 1,
      //   "message": "查询成功",
      //   "data": [{
      //     "id": 26,
      //     "proName": "1",
      //     "childProName": "1",
      //     "childProValue": null,
      //     "jobResponsibility": "1",
      //     "jobStandard": "1",
      //     "scoreStandard": "111111111111111",
      //     "evaluateName": "冉铮2018-01 生成时间 12:17绩效考核",
      //     "complete": null,
      //     "reason": {
      //       "personal": "123",
      //       "bumen": null,
      //       "kpgroup": null
      //     },
      //     "remarks": "dffsff",
      //     "taskId": "10034",
      //     "personal": {
      //       "inputs": null,
      //       "score": 0.0,
      //       "complete": "负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；负责运营部工作例会的组织和讲评；",
      //       "remarks": null
      //     },
      //     "bumen": {
      //       "inputs": null,
      //       "score": -1.0,
      //       "complete": "fdsfsfaf",
      //       "remarks": null
      //     },
      //     "kpgroup": {
      //       "inputs": null,
      //       "score": 1,
      //       "complete": "",
      //       "remarks": null
      //     }
      //   }, {
      //     "id": 27,
      //     "proName": "2",
      //     "childProName": "2",
      //     "childProValue": null,
      //     "jobResponsibility": "2",
      //     "jobStandard": "2",
      //     "scoreStandard": "22222222",
      //     "evaluateName": "冉铮2018-01 生成时间 12:17绩效考核",
      //     "complete": null,
      //     "reason": {
      //       "personal": "123",
      //       "bumen": null,
      //       "kpgroup": null,
      //     },
      //     "remarks": "fdfsfsaf",
      //     "taskId": "10034",
      //     "personal": {
      //       "inputs": null,
      //       "score": 0.0,
      //       "complete": "2222222222222222",
      //       "remarks": null
      //     },
      //     "bumen": {
      //       "inputs": null,
      //       "score": 2.0,
      //       "complete": "fdsfsfa",
      //       "remarks": null
      //     },
      //     "kpgroup": {
      //       "inputs": null,
      //       "score": -2,
      //       "complete": "",
      //       "remarks": null
      //     }
      //   }, {
      //     "id": 25,
      //     "proName": "基 础工 作（65分）",
      //     "childProName": "25分基础管理",
      //     "childProValue": null,
      //     "jobResponsibility": "负责运营部工作例会的组织和讲评；",
      //     "jobStandard": "每月至少组织1次，有记录。\n有讲评、分析、记录。\n",
      //     "scoreStandard": "未组织、记录各扣1分；111",
      //     "evaluateName": "冉铮2018-01 生成时间 12:17绩效考核",
      //     "complete": null,
      //     "reason": {
      //       "personal": "123",
      //       "bumen": null,
      //       "kpgroup": null,
      //     },
      //     "remarks": "fdsfafa",
      //     "taskId": "10034",
      //     "personal": {
      //       "inputs": null,
      //       "score": 0.0,
      //       "complete": "组织：2次\n\n",
      //       "remarks": null
      //     },
      //     "bumen": {
      //       "inputs": null,
      //       "score": 3.0,
      //       "complete": "fdsafa ",
      //       "remarks": null
      //     },
      //     "kpgroup": {
      //       "inputs": null,
      //       "score": 5,
      //       "complete": "",
      //       "remarks": null
      //     }
      //   }]
      // }
      //经理评分
      {
        "status": 1,
        "message": "查询成功",
        "data": [{
          "id": 288,
          "proName": "经济指标（20分-分部经理）\n\n",
          "childProName": "经济指标\n\n",
          "childProValue": null,
          "jobResponsibility": "1、全面完成租金收缴计划，负责欠费车辆租费的催缴",
          "jobStandard": "1、每月30日前全面完成租金收缴计划；下月4日17点后缴纳，按欠缴处理。\n",
          "scoreStandard": "按计划完成，延期1天100元扣0.01分。欠缴100元扣0.5分（欠缴金额未收回的从个人年度工资总额扣出）。超出计划部分另行奖励。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "日期：12月30日\n计划;881132.27元\n实际;881132.27元\n完成 ：100 %\n\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 289,
          "proName": "经济指标（20分-分部经理）\n\n",
          "childProName": "经济指标\n\n",
          "childProValue": null,
          "jobResponsibility": "2、负责催办承包车辆缴费银行卡的办理；银行、网上缴纳租费",
          "jobStandard": "2、银行交款不低于90%。（当月废业车辆不在考核之内）\n\n",
          "scoreStandard": "未达标每降低1%，扣0.1分；每上升1%加0.1分。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "个人备注：+1",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 1.0,
            "complete": "计划 ：90%\n实际：100%\n差额 ：0%\n\n\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 290,
          "proName": "经济指标（20分-分部经理）\n\n",
          "childProName": "经济指标\n\n",
          "childProValue": null,
          "jobResponsibility": "3、负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。",
          "jobStandard": "3、按合同约定收回车辆；证照齐全有效；及时签订合同。\n\n",
          "scoreStandard": "未按期收回，延期1天扣1分；\n未及时签订（每台）扣0.5分。\n",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "计划（0）台\n实际（0）台\n延期（0 ）台",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 291,
          "proName": "经济指标（20分-分部经理）\n\n",
          "childProName": "经济指标\n\n",
          "childProValue": null,
          "jobResponsibility": "4、负责新车、转包车辆的发包工作。转包车辆的验车。",
          "jobStandard": "4、按公司《车辆发包方案》执行。填写验车单（车辆设施、计价器打印发票）\n\n",
          "scoreStandard": "未按规定执行每台扣2分。\n未检查车辆、无验车单扣0.5分。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "新车：台\n转租：2台\n验车单：份\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 292,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "驾驶员培训教育（25分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "1、负责驾驶员的岗前资质审核（证照、证明、表）、退出审批，参加岗前培训。",
          "jobStandard": "1、按《驾驶员准入制度》办理，审核率100%。达到营运服务标准；关注大众微信平台。打车软件的使用。",
          "scoreStandard": "1、证照、证明、表不符合要求每人次扣0.2分 。\n2、未参加岗前培训的每次扣1分\n3、岗前培训驾驶员不着装每、微信未关注的每人次扣0.2分",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "新办：12人\n退出：7人\n参加培训：14次\n未着装：0人\n微信未关注：0人",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 293,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "驾驶员培训教育（25分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "2、负责驾驶员例会（补会）组织、宣讲（有宣讲教案）",
          "jobStandard": "1）每月18日按例会计划上报教育素材，按照公司教育安排进行宣讲；\n2）现场例会：出席率达100%\n3）微信平台回复率达100%",
          "scoreStandard": "1）未按时上报素材的扣1分；\n2）参加公司例会教育面未达100%，加2分。每降1%扣0.2分； 迟到、早退每人次扣0.05分。\n3）微信回复100%，加2分，每降低1%扣0.2分，微信未回复的参加补会",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "个人备注：+2\n-0.3",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 1.7,
            "complete": "上报时间:  1日\n参加公司例会教育面未达：100%\n迟到 ：0人\n微信回复：",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 294,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "驾驶员培训教育（25分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "3、做好驾驶员百分考核和分类管理工作；",
          "jobStandard": "每月例会公布考核成绩并讲评，80分以下的作为重点驾驶员管理。",
          "scoreStandard": "未讲评各扣1分； 未家访的按重点驾驶员考核",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "80分以下：人",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 295,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "驾驶员培训教育（25分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "4、负责组织新聘驾驶员和重点驾驶员岗前及岗中培训；负责三必到、二必访工作。",
          "jobStandard": "1、对新发包车、二手车必访；\n2、重点驾驶员必访：\n1）发生重大交通事故，一般事故年度2次以上；\n2）交通违章曝光3次/月以上；\n3）新闻媒体曝光，行业处罚、通报1次，；\n4）年度内3次以上投诉\n3、按公司规定有访必到、填写家访登记表、月末上报运营管理部。",
          "scoreStandard": "1、\t当月必访未访的，每人次扣1分\n2、\t当月未按时、按质提交登记表的每人次扣0.2分。\n3、未组织参加培训的每人次扣0.5分",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "新  车：\n二手车：人\n重点驾驶员：\n（投诉驾驶员已参加培训教育）",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 296,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "驾驶员培训教育（25分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "5、负责组织驾驶员参加行业和公司活动；",
          "jobStandard": "1、按要求组织好活动；\n2、做好驾驶员员活动的收集，整理报送工作",
          "scoreStandard": "1、参加活动每缺少一人扣0.5分；\n2、 收集内容按媒体宣传考核明细表考核；\n",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "个人备注：+0.4",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.4,
            "complete": "活动1次\n参加2人\n缺席 0 人\n收集 0次；",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 297,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "车辆安全管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "1、负责车辆保险、续保（委托管理车辆保单索取），并交到运营部；",
          "jobStandard": "1、按计划完成，不发生漏保；",
          "scoreStandard": "1、未按时索取保单每车扣1分，发生漏保扣2分；\n\n",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "1、委托：0台\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 298,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "车辆安全管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "2、按计划完成车辆保险续保",
          "jobStandard": "2、100%完成调整计划；未调整必须有家访记录；",
          "scoreStandard": "未按计划完成续保1台车扣2分；无家访记录的扣0.3分。\n\n\n",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "计划调整:    台；\n实际调整：   台；\n家访单：    份\n\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 299,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "车辆安全管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "3、负责交通事故的登记、重大交通事故及伤人事故的跟踪、处理；",
          "jobStandard": "接到驾驶员通知后及时到事故现场，做好登记、协助调查、处理",
          "scoreStandard": "1、发生事故理赔当月未登记的每台车扣0.5分；\n2、未及时到达被驾驶员投诉每次扣1分；\n3、未跟踪处理导致公司经济损失2万元以上的扣10分；\n4、死亡事故：负全责扣15分、主责10分、同等5分、次责3分。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "1、登  记 ：20起\n2、到现场：    次\n3、伤人事故：0起\n4、死亡事故：0次\n5、公司经济损：无",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 300,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "车辆安全管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "4、安全指标考核",
          "jobStandard": "按照公司《安全管理办法》执行，按公司交强险、商业险出险赔款次数考核",
          "scoreStandard": "1、商业险：6起不扣分，每降一起加0.5分，每超一起扣0.5分。\n2、交强险12起不扣分，每降一起加0.1分，每超一起扣0.1分；",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "个人备注：+0.5",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.5,
            "complete": "1、\t商业险：5次\n2、\t交强险：12次\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 301,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "车辆安全管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "5、负责本部门车辆、证照检验（计价器、客检、二保、安检、）检验组织工作。",
          "jobStandard": "参检、审验、合格率达到100%，对未参检、未合格车辆跟踪落实。",
          "scoreStandard": "每下降1%扣0.2分；未跟踪落实造成后果的每车扣5分。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "计划：100%\n实际：100%\n未检：\n\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 302,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "车辆安全管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "6、交通违章、电子曝光单的处理。",
          "jobStandard": "三次以上（含三次）的违章在例会上通报，作为重点驾驶员管理",
          "scoreStandard": "未在例会通报的扣1分。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "违章：   次；\n\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 303,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "运营服务管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "1、负责对车辆进行动、静态检查；填写出租车发放的《车辆自检自查情况记录表》",
          "jobStandard": "月检查营运车辆达100%，有记录、有签字；",
          "scoreStandard": "记录不规范扣1分，检查少一台次的扣1分；",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "月检车：217台次\n\n",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 304,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "运营服务管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "2、按时参加行业、公司组织的联检及活动，负责员工自检、联检问题车辆的整改及处理；",
          "jobStandard": "1、按要求参加联检及活动\n2、问题车辆48小时内复检处理，有照片（车容车貌）、有记录；\n3、配合场站管理人员处理公司违制车辆",
          "scoreStandard": "1、未参加一次扣2分\n未复检、未记录每台扣0.2分；\n2、未按规定处理整改的每台次扣1分；\n3、未配合场站管理人员处理公司违制车辆扣2分",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "1、行业：1次\n     公司： 3次\n2、问题车辆：2台次\n     整改车辆：2台次\n3、配合处理：台次",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 305,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "运营服务管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "3、负责违制及新闻媒体曝光和行业通报批评驾驶员的处理",
          "jobStandard": "1、违制及媒体曝光、行业通报驾驶员按违制流程处理，有照片、处理单；\n2、按公司处罚规定执行\n3、跟踪、督促驾驶员在规定期限内接受行业调查、处理情况。",
          "scoreStandard": "1、月度零投诉加10分；年度零处罚、通报加40分\n2、投诉率：3%以下不扣分，每下降1%加0.5分；3%以上-5%以下每台车扣0.2分,5%以上每台扣0.5分。\n3、未按流程和公司规定处理每台次扣2分。\n4、未在规定期限内接受处理，被行业处罚，一起扣5分。\n5、行业通报扣2分，行业处罚扣4分媒体曝光扣5分\n6、当月入职的驾驶员发生投诉加扣0.3分/次\n7、年度内单车违反以上违制行为的按照次数加倍处罚。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "个人备注：-9\n-2",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": -11.0,
            "complete": "投诉：11起\n不属实：3台|次\nTD690车号不符；\nTN406没有营运；\nTY853车号不符\n投诉率：5.07%\n通报：次",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 306,
          "proName": "基 础工作（65分-分部经理）\n\n",
          "childProName": "运营服务管理（20分）\n\n\n",
          "childProValue": null,
          "jobResponsibility": "4、负责对乘客满意度测评结果的分析、处理。",
          "jobStandard": "乘客满意度指数90为合格基数，对问题车辆进行整改。有处理单，例会讲评。",
          "scoreStandard": "1、每增、降1分，增、扣0.5分；未整改、未讲评各扣2分。\n2、连续2个月不达标车辆，每台次扣1分。",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "个人备注：+2.5",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 2.5,
            "complete": "满意度：92.47 %\n不达标：    台",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 307,
          "proName": "指令性工作（10分-分部经理）\n\n",
          "childProName": "指令性工作\n\n\n",
          "childProValue": null,
          "jobResponsibility": "1、\t感动大众\n2、\t冰雪大世界出勤\n",
          "jobStandard": "1、\t负责通知驾驶员参会\n2、\t按公司计划参加路检\n",
          "scoreStandard": "1、\t未完成扣10分\n2、\t未完成扣10分",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "1.\t通知30人\n2.\t参加2次",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }, {
          "id": 308,
          "proName": "行为规范（5分-分部经理）\n\n",
          "childProName": "行为规范\n\n\n",
          "childProValue": null,
          "jobResponsibility": "1、统一着员工服\n2、不迟到早退，出满勤\n3、文明办公行为符合公司规定\n4、每月3日提交考核自评\n5、部门之间互相支持、互相配合、共同协作\n6、按规定使用OA系统",
          "jobStandard": "1、部门统一着员工服。\n2、无迟到早退、出满勤\n3、符合公司要求\n4、按时上交，认真自评，无差错。\n5、用下一道工序是客户的标准，完成需多部门共同完成的工作，无投诉。\n6、查看并回复邮件，每日详实填写工作日志",
          "scoreStandard": "1、未按要求着装一次扣1分，累计计算，最高不超5分。\n2、迟到、早退每次扣0.5分，事假每天扣1分,最高不超5分\n3、发生不文明行为此项不得分因未尽职责被员工或驾驶员投诉属实此大项不得分。\n4、未按时提交超一天扣0.2分，未按规定新版本提交扣1分,有差错每项扣0.1分。\n5、内部员工投诉扣5分；其他两个部门投诉，扣10分，扣完为止。\n6、未及时回复每次扣0.2分，未填写工作日志每天扣0.5分",
          "evaluateName": "郭庆辉2018-02 生成时间 11:22绩效考核",
          "complete": null,
          "reason": {
            "personal": null,
            "bumen": null,
            "kpgroup": null
          },
          "remarks": "",
          "taskId": "32",
          "personal": {
            "inputs": null,
            "score": 0.0,
            "complete": "按要求完成",
            "remarks": null
          },
          "bumen": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          },
          "kpgroup": {
            "inputs": null,
            "score": null,
            "complete": null,
            "remarks": null
          }
        }]
      }
      )
    })

    app.get(["/tables"], function(req, res) {
      res.send(
        {
          "status":1,
          "message":"查询成功",
          "data":[
          {"id":15,"key":null,"department":"运营管理部","proName":"经济指标","childProName":"租金缴纳","childProValue":50,"jobResponsibility":"全面完成租金收缴计划，负责欠费车辆租费的催缴","complete":"开始#date# \n结束#date#\n计划：##   元\n实际：##   元 <br>完成 : ## %","scoreStandard":"按计划完成，延期1天100元扣0.01分。欠缴100元扣0.5分（欠缴金额未收回的从个人年度工资总额扣出）。超出计划部分另行奖励。","jobStandard":"每月30日前全面完成租金收缴计划；下月4日17点后缴纳，按欠缴处理。","evaluateName":"2017-07绩效考核"},
          {"id":16,"key":null,"department":"综合办公室","proName":"经济指标","childProName":"承包车辆","childProValue":30,"jobResponsibility":"负责催办承包车辆缴费存折的办理；","complete":"计划:##%<br>实际:##%<br>差额##%","scoreStandard":"未达标每降低1%，扣0.1分；每上升1%加0.1分。","jobStandard":"银行交款不低于90%。（当月废业车辆不在考核之内）","evaluateName":"2017-07绩效考核"},
          {"id":17,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          {"id":18,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          {"id":19,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          {"id":23,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          {"id":44,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          {"id":55,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          {"id":66,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          {"id":11,"key":null,"department":"计财部","proName":"经济指标","childProName":"合同管理","childProValue":20,"jobResponsibility":"负责合同到期营运车辆及手续的收回，延期营运车辆补充合同的办理。","complete":"计划 ##台<br>实际##台<br>延期##台","scoreStandard":"未按期收回，延期1天扣1分；未及时签订（每台）扣0.5分。","jobStandard":"按合同约定收回车辆；证照齐全有效；及时签订合同。","evaluateName":"2017-07绩效考核"},
          ]
        }
       
        )
    })

    app.get(["/tables/save"], function(req, res) {
      res.send();
    })

    app.put(["/xiugai"], function(req, res) {
      res.send({
        data:{
          id : 999
        },
        status:1,
      });
    })

}