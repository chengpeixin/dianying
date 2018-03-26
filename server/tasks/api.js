// https://api.douban.com/v2/movie/subject/1764796
// const rp = require('request-pomise-native')
const rp = require('request-promise-native')

async function fetchMovie(item) {
    const url = `https://api.douban.com/v2/movie/subject/${item.doubanID}`
    const res = await rp(url)
    return res
}

;
(async () => {
    let movies = [{
            doubanID: 27046744,
            title: '第60届格莱美奖颁奖典礼',
            rate: 5.1,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2512050729.jpg'
        },
        {
            doubanID: 27040737,
            title: '祈祷落幕时',
            rate: 8.1,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2503849067.jpg'
        },
        {
            doubanID: 27056322,
            title: '花悸',
            rate: 5.8,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2511826863.jpg'
        }
    ]
    movies.map(async movie => {
        let movieData = await fetchMovie(movie)
        try {
            const data = JSON.parse(movieData)
            console.log(data.summary)
        } catch (err) {
            console.log(err)
        }
    })
})()