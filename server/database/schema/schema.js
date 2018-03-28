const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const movieSchema = new Schema({
  doubanId: String,
  rate: Number,
  title: String,
  summary: String,
  video: String,
  cover: String,

  videoKey: String,
  posterKey: String,
  coverKey: String,


  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,
  tags: [String],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
mongoose.model('Movie', movieSchema)