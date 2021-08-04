const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { isProd } = require('./utils/env')

// 路由注册
const errorViewRouter = require('./routes/view/error')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const index = require('./routes/index')

// error handler 页面显示错误
const onerrorConf = isProd ? {
    redirect: '/error'
} :  {}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json()) // JSON格式化
app.use(logger()) // 日志中间件

// public目录下的文件当做静态资源来访问
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs' // 后缀名
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由注册到最下面

// error-handling 服务端错误信息
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
