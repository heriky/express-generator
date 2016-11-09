const http = require('http');
const express = require('express');
const app = express() ;
const path =  require('path');
const config = require('./env.config');

// 一系列中间件处理
const favicon = require('serve-favicon') ;
const  logger = require('morgan') ;
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
//const redisStore = require('connect-redis');使用redis存储session
const cookieParser = require('cookie-parser'); //req.cookie
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dbUrl = config.mongo.connectUri+config.mongo.db;
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

/* 1. 程序基本配置*/
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
    secret: 'This is private key of 128 chars',
    cookie: {
        maxAge: 1800 * 1000, // 30分钟
        httpOnly: true
    },
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: true,
    saveUninitialized: false
}));
app.use(cookieParser()) ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended: true}));

//文件上传处理, 不应该用在全局中间件，而用在特定请求流程中加入此中间件
// var multer = require('multer');
// var upload = multer({ dest: 'tmp/' }) ;
// app.post('/upload', upload, (req,res)=>{保存文件})

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, './views'));
app.use('/static',express.static(path.resolve(__dirname,'./public'))) ; // 挂载静态资源
app.locals.moment = require('moment') ; // 向静态页嵌入变量

/* 2.配置开发环境*/
if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

/* 3.路由总入口, router提供miniApp */
const router = require('./routes') ;
app.use('/', router);

/* 4.处理错误*/
// 500错误
app.use((err, req, res, next) => {
    if (err) {
        console.log(err.stack)
        res.status(500).send('Server Internal Err : ' + err.msg + ' [hk]')
        throw err
    } else {
        next();
    }
})

// 404 错误
app.use((err, req, res, next) => {
    var err = Error('404 NOT FOUND [hk]')
    console.log(err.stack);
    res.status(404).send(err);
})

/* 5. 开始监听*/
const port = config.port || process.env.PORT || 3000 ;
http.createServer(app).listen(port, (err)=>{
	console.log('server is running on port '+ port);
})
