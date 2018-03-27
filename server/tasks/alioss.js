const co = require('co')
const OSS = require('ali-oss')
// const nanoid = require('nanoid')
const config = require('../config')
const movies = [{
  data: {
    video: 'http://vt1.doubanio.com/201803262133/956fa357670e0f8d1473711ce32a99fa/view/movie/M/302280429.mp4',
    doubanID: '20435622',
    title: '环太平洋：雷霆再起',
    rate: 5.8,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512933684.jpg'
  }
}]
const client = new OSS(config.aliOsscled)
co(function* () {
  client.useBucket('xpcdouban');
  const result = yield client.put('aaaimg', new Buffer('https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512933684.jpg'))
  console.log(result)
})