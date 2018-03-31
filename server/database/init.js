const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-trailer'
mongoose.Promise = global.Promise
const glob = require('glob')
const path = require('path')
exports.initSchema = () => {
  glob.sync(path.resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db)
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了，检查代码！')
      }
    })
    mongoose.connection.on('error', error => {
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了，检查代码！')
      }
    })
    mongoose.connection.once('open', () => {
      // let Dog = mongoose.model('Dog', {
      //   name: String
      // })
      // const doga = new Dog({
      //   'name': "阿尔法"
      // })
      // doga.save().then(() => {
      //   console.log('汪')
      // })
      resolve()
      console.log('MongoDB Connected sussessfully')
    })
  })

}