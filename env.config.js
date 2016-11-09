var path = require('path');
module.exports = {
	port: 3000,
	mongo:{
		connectUri: 'mongodb://127.0.0.1:27017/',// 自定义uri地址
		db: 'demoDb', // 自定义数据库名称
		// user: '', 用户验证
		// pwd:''
	},
	staticRes: path.resolve(__dirname,'./public') // 静态资源地址

}