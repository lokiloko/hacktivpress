const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema
const encrypt = require('../helpers/cryptoHelper')

mongoose.connect('mongodb://localhost/hacktivpress-ian', {
  useMongoClient:true
})

mongoose.Promise = global.Promise

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
})

var User = mongoose.model('User', userSchema)

class Model {
  static model () {
    return User
  }
  static login (username, password) {
    return new Promise((resolve, reject) => {
      User.findOne({username:username}).then((user) => {
        password = encrypt(password)
        if (password === user.password) {
          var token = jwt.sign({
            username: user.username,
            _id:user._id
          }, process.env.JWT_KEY)
          resolve({
            message: 'Login Success',
            token: token
          })
        } else {
          resolve({
            message: 'Login Failed',
          })
        }
      }).catch((err) => {
        reject({
          message: 'Failed to fetch username'
        })
      })
    })
  }
  static register (insert) {
    return new Promise((resolve, reject) => {
      insert.password = encrypt(insert.password)
      User.create({username:insert.username, password:insert.password}).then((user) => {
        resolve({
          message: 'Register Success',
          data: user
        })
      }).catch((err) => {
        reject({
          message: 'Register Failed',
          err: err
        })
      })
    })
  }
}

module.exports = Model;
