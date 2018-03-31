const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const SALT_WORK_FACTOR = 10
let MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    unique: true,
    type: String,
    required: true,
  },
  username: {
    unique: true,
    type: String,
  },
  lockUntil: Number,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
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

userSchema.virtual('isLocked').get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})
userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.mate.updatedAt = Date.now()
  } else {
    this.mate.updatedAt = Date.now()
  }
  next()
})

userSchema.pre('save', function (next) {
  if (!user.ismodified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
  if (this.isNew) {
    this.meta.createdAt = this.mate.updatedAt = Date.now()
  } else {
    this.mate.updatedAt = Date.now()
  }
  next()
})

// 实例方法
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  // 是否登录超过次数
  incLoginAttepts: (user) => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            loginAttempts: 1
          }
        }, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          //增加时间锁定
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }
        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })

  }
}
mongoose.model('User', userSchema)