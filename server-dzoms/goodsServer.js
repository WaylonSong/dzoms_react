module.exports = function(app) {
	var path = require('path')
	var basePath = path.resolve(__dirname, '..')
	app.get("/officeIssue", function(req, res) {
		res.sendFile(basePath + '/pages/goods/officeIssue.html')
	})
	app.get("/officePurchase", function(req, res) {
		res.sendFile(basePath + '/pages/goods/officePurchase.html')
	})
	app.get("/officeHistory", function(req, res) {
		res.sendFile(basePath + '/pages/goods/officeHistory.html')
	})
	app.get("/yunyingbuIssue", function(req, res) {
		res.sendFile(basePath + '/pages/goods/yunyingbuIssue.html')
	})
	app.get("/yunyingbuPurchase", function(req, res) {
		res.sendFile(basePath + '/pages/goods/yunyingbuPurchase.html')
	})
	app.get("/yunyingbuHistory", function(req, res) {
		res.sendFile(basePath + '/pages/goods/yunyingbuHistory.html')
	})
	app.get("/goodsManagement", function(req, res) {
		res.sendFile(basePath + '/pages/goods/goodsManagement.html')
	})
	app.get("/goodsIssueHisInfo", function(req, res) {
		res.sendFile(basePath + '/pages/goods/goodsIssueHisInfo.html')
	})

	app.get(["/chepaihaoA"], function(req, res) {
		// res.send(["780LK", "SW110", "IL363", "IL373", "SQ001", "BQ002", "SQ021", "SQ101", "SQ031", "SQ801", "BQ802"]);
		res.send({status:1, data:["黑A780LK", "黑ASW110", "黑AIL363", "黑AIL373", "黑ASQ001", "黑ABQ002", "黑ASQ021"]});
	})

	app.post(["/goodsPurchase"], function(req, res) {
		res.send({
			"status": 1,
			"message": "入库成功",
			"data": []
		});
	})

	app.get(["/goodsList"], function(req, res) {
		res.send({
			"status": 1,
			"message": "查询成功",
			"data": [{
				"itemId": 0,
				"itemName": "零件1",
				"itemType": "SYP7-2017-06",
				"itemTotalNum": "550",
				"itemPurchasingPrice": "20",
				"itemUnit": "个",
				"itemRemarks": "零件1备注信息"
			}, {
				"itemId": 1,
				"itemName": "零件2",
				"itemType": "SYP7-2017-06",
				"itemTotalNum": "200",
				"itemPurchasingPrice": "20",
				"itemUnit": "个",
				"itemRemarks": "零件2备注信息"
			}, {
				"itemId": 3,
				"itemName": "零件3",
				"itemType": "SYP7-2017-06",
				"itemTotalNum": "300",
				"itemPurchasingPrice": "100",
				"itemUnit": "个",
				"itemRemarks": "零件3备注信息"
			}, {
				"itemId": 5,
				"itemName": "零件4",
				"itemType": "SYP7-2017-06",
				"itemTotalNum": "450",
				"itemPurchasingPrice": "50",
				"itemUnit": "个",
				"itemRemarks": "零件4备注信息"
			}]
		});
	})
	
	app.get(["/driversAndHistory"], function(req, res) {
		if (req.query.itemId < 2)
			res.send({
				drivers: [{
					name: "张三",
					id: "230103199901011234"
				}, {
					name: "李四",
					id: "230103199901011235"
				}],
				history: [{
					itemName: "纸巾",
					itemType: "日常",
					number: "2",
					driverName: "张三",
					time: "2018-03-01 12:12:12"
				}, {
					itemName: "纸巾",
					itemType: "日常",
					number: "2",
					driverName: "张三",
					time: "2018-02-01 12:12:12"
				}, {
					itemName: "纸巾",
					itemType: "日常",
					number: "1",
					driverName: "张三",
					time: "2018-01-01 12:12:12"
				}]
			});
		else
			res.send({
				drivers: [{
					name: "王五",
					id: "230103199901011234"
				}, {
					name: "赵六",
					id: "230103199901011235"
				}],
				history: [

				]
			});
	})
	
	app.post(["/submit"], function(req, res) {
		//
		if (req.body.count > 2) {
			res.send({
				"status": -1,
				"message": "库存不足",
				"data": []
			});
		}
		res.send({
			"status": 1,
			"message": "领用成功",
			"data": []
		});

	})

	app.get(["/goods"], function(req, res) {
		res.send({
			"status": 1,
			"message": "查询成功",
			"data": [{
				"id": 1,
				"itemName": "床单",
				"itemUnit": "个",
				"itemType": "SYP7",
				"itemRemarks": "aaaa",
				"itemState": "1"
			}, {
				"id": 2,
				"itemName": "床单1",
				"itemUnit": "个1",
				"itemType": "SYP117",
				"itemRemarks": "aaaa",
				"itemState": "1"
			}]
		});
	})

	app.get(["/yunyingbu/goods/history"], function(req, res) {
    res.send(
      {
          "status":1,
          "message":"查询成功",
          "data":[
         {"id":11,
         "personName":"黄嵩凯",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         },
         {"id":12,
         "personName":"黄嵩凯1",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         },
         {"id":15,
         "personName":"黄嵩凯2",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         },
         {"id":16,
         "personName":"黄嵩凯3",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         },
         {"id":17,
         "personName":"黄嵩凯",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         },
         {"id":18,
         "personName":"黄嵩凯1",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         },
         {"id":19,
         "personName":"黄嵩凯2",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         },
         {"id":20,
         "personName":"黄嵩凯3",
         "itemName":"座套",
         "idNumber":"232301199501208855",
         "carId":"黑A12450",
         "count":"5",
					time: "2018-01-01 12:12:12"
         }         
          ] 
        }
      );
});
	app.get(["/office/goods/history"], function(req, res) {
    res.send(
      {
          "status":1,
          "message":"查询成功",
          "data":[
         {"id":11,
         "personName":"黄嵩凯",
         "itemName":"铅笔",
         "department":"信息部",
         "count":"5",
         "state": 0,
		 applyTime: "null",
		 time: "null",
         },
         {"id":12,
         "personName":"黄嵩凯1",
         "itemName":"橡皮",
         "department":"运营部",
         "count":"5",
         "state": 1,
		 applyTime: "2017-01-01 12:12:12",
					time: "2018-01-01 12:12:12"
         },
          ] 
        }
      );
});


	app.post(["/updateStorage"], function(req, res) {
		res.send({
			"status": 1,
			"message": "查询成功",
			"data": []
		});
	})


	

}