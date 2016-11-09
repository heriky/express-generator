# express-generator
express+jade+mongodb 项目框架生成器

### 0. 使用

> npm install && npm start

### 1. 中间件
+ serve-favicon   小图标定义
+ morgan          服务运行日志
+ express-session 服务器session处理
+ connect-mongo   session存储
+ cookie-parser   res.cookie() / req.cookie()
+ body-parser     req.body() / req.json()
+ mongoose        mongodb ODM

+ view engine     jade
+ static res      express.static
+ app.locals      模板变量注入
+ monment         日期时间格式化

### 2. 目录结构

// MVC 结构
- views/
- models/
- controllers/

- public/    静态资源
- test/      测试用例
- routes.js  路由配置
- app.js     程序入口
- env.config.js 项目配置

### 3.定制手脚架
[Bee](https://github.com/heriky/Bee)
