// https://api.douban.com/v2/movie/subject/1764796
// const rp = require('request-pomise-native')
const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

async function fetchMovie(item) {
    const url = `https://api.douban.com/v2/movie/subject/${item.doubanID}`
    const res = await rp(url)
    return res
}

;
(async () => {
    let movies = await Movie.find({
        $or: [{
                summary: {
                    $exists: false
                },

            }, {
                summary: null
            },
            {
                title: ''
            },
            {
                summary: ''
            }
        ]
    })

    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i]
        let movieData = await fetchMovie(movie)

        if (movieData) {
            let tags = movieData.tags || []

            movie.tags = tags
            movie.summary = movieData.summary || ''
            movie.title = movieData.alt.title || movieData.title || ''
            movie.rawTitle = movieData.rawTitle || movieData.title || ''
            if (movieData.attrs) {

                for (let i = 0; i < movie.movieTypes.length; i++) {
                    let item = movie.movieTypes[i]
                    movie.movieTypes = movieData.attrs.movie_Type || []
                    let cat = await Category.findOne({
                        name: item
                    })
                    if (!cat) {
                        cat = new Category({
                            name: item,
                            movies: [movie._id]
                        })
                    } else {
                        if (cat.movies.indexOf(movie._id) === -1) {
                            cat.movies.push(movie._id)
                        }
                    }
                    await cat.save()

                    if (!movie.Category) {
                        movie.Category.push(cat._id)
                    } else {
                        if (movie.Category.indexOf(cat._id) === -1) {
                            movie.Category.push(cat._id)
                        }
                    }
                }


                let dates = movieData.attrs.pubdate || []
                let pubdates = []
                dates.map(item => {
                    if (item && item.split('(').length > 0) {
                        let parts = item.split('(')
                        let date = parts[0]
                        let country = '未知'
                        if (parts[1]) {
                            country = parts[1].split(')')[0]
                        }
                        pubdates.push({
                            date: new Date(date),
                            country
                        })
                        movie.pubdate = pubdates
                    }
                    tags.forEach(tag => {
                        movie.tags.push(tag.name)
                    })
                    await movie.save()
                })
            }

        }
    }
})()