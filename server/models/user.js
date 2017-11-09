const mongoose = require('mongoose')
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
          
        }
      }).catch((err) => {
        reject({
          message: 'Failed to fetch username'
        })
      })
    })
  }
}

module.exports = Model;
