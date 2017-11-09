const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/hacktivpress-ian', {
  useMongoClient:true
})

mongoose.Promise = global.Promise

var articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

var Article = mongoose.model('Article', articleSchema)

class Model {
  static model () {
    return Article
  }
  static read () {
    return new Promise((resolve, reject) => {
      Article.find({
        $sort:{
          created_at: -1
        }
      }).then((articles) => {
        var obj = {
          message: 'Data Found'
          data: articles
        }
        resolve(obj)
      }).catch((err) => {
        var obj = {
          message: 'Error when get data'
          err: err
        }
        reject(err)
      })
    })
  }
  static create () {

  }
}
module.exports = Model;
