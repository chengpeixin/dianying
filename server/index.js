const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const {
    resolve
} = require('path')
const serve = require('koa-static')
const openBrowser = require('./devBrowser')
const port = '8080'
app.use(serve(__dirname + '/views'))
    .use(views(resolve(__dirname, './views'), {
        'extension': 'pug'
    }))
    .use(async (ctx, next) => {
        await ctx.render('index.pug', {
            'you': 'Luke',
        })
    })

app.listen(port)
openBrowser()