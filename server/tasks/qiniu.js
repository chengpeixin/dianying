const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({
            key
          })
        } else {
          reject(info)
        }
      }
    })
  })
}

;
(async () => {
  const movies = [{
    video: 'http://vt1.doubanio.com/201803262133/956fa357670e0f8d1473711ce32a99fa/view/movie/M/302280429.mp4',
    doubanID: '20435622',
    title: '环太平洋：雷霆再起',
    rate: 5.8,
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512933684.jpg'
  }]
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        let videData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')
        if (videData.key) {
          movie.videoKey = videData
        }
        console.log('上传完成')
        if (posterData.key) {
          movie.posterData = posterData
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
})()