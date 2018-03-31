const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.Types.ObjectId
const movieSchema = new Schema({
  doubanId: {
    unique: true,
    type: String
  },
  category: [{
    type: ObjectId,
    ref: 'Category'
  }],
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

movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.mate.updatedAt = Date.now()
  } else {
    this.mate.updatedAt = Date.now()
  }
  next()
})
mongoose.model('Movie', movieSchema)