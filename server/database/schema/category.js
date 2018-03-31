const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const categorySchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  movies: [{
    type: ObjectId,
    ref: 'Movie'
  }],
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


categorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.mate.updatedAt = Date.now()
  } else {
    this.mate.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Category', categorySchema)