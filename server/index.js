const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const { resolve } = require('path')
const serve = require('koa-static')

app.use(serve(__dirname+'/views'))

app.use(views(resolve(__dirname,'./views'),{
    'extension':'pug'
}))
app.use(async (ctx,next)=>{
    await ctx.render('index.pug',{
        'you':'Luke',
    })
})

app.listen(8080)