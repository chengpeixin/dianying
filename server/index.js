const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mongoose = require('mongoose')
const {
    resolve
} = require('path')
const {
    connect,
    initSchema
} = require('./database/init')
const serve = require('koa-static')
const openBrowser = require('./devBrowser')
const port = '8090'


;
(async () => {
    await connect()
    await initSchema()
    /*注入模型xd*/
    // const Movie = mongoose.model('Movie')
    // const movies = await Movie.find({})
    // console.log(movies)
    require('./tasks/movie')

})()
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