module.exports = function(app){
	var path = require('path')
	var basePath = path.resolve(__dirname, '..')
	app.get("/statistics/index", function(req, res) {
	  res.sendFile(basePath + '/statistics/index.html')
	})
}