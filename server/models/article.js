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
  static readOne (id) {
    return new Promise((resolve, reject) => {
      Article.findOne({
        _id: id
      }).then((article) => {
        resolve({
          message: 'Data Found',
          data: article
        })
      }).catch((err) => {
        reject({
          message: 'Error when get one data',
          err: err
        })
      })
    })
  }
  static readByAuthor (author) {
    return new Promise((resolve, reject) => {
      Article.find({
        author: author
      }, {$sort:{created_at:-1}}).then((articles) => {
        resolve({
          message: 'Data Found',
          data: articles
        })
      }).catch((err) => {
        reject({
          message: 'Error when get one data',
          err: err
        })
      })
    })
  }
  static readByCategory (category) {
    return new Promise((resolve, reject) => {
      Article.find({
        category: category
      }, {$sort:{
        created_at: -1
      }}).then((articles) => {
        resolve({
          message: 'Data Found',
          data: articles
        })
      }).catch((err) => {
        reject({
          message: 'Error when get one data',
          err: err
        })
      })
    })
  }
  static create (insert) {
    return new Promise((resolve, reject) => {
      Article.create({
        title: insert.title,
        content: insert.content,
        category: insert.category,
        author: insert.author,
      }).then((article) => {
        resolve({
          message: 'Article created',
          data: article
        }).catch((err) => {
          reject({
            message: 'Article create failed',
            err: err
          })
        })
      })
    })
  }
  static update (update) {
    return new Promise((resolve, reject) => {
      Article.findOneAndUpdate({
        _id:update._id
      }, update, {
        new: true
      }).then((article) => {
        resolve({
          message: 'Article updated',
          data: article
        })
      }).catch((err) => {
        reject({
          message: 'Article update failed',
          err: err
        })
      })
    })
  }
  static delete (id) {
    return new Promise((resolve, reject) => {
      Article.findOneAndRemove({
        _id: id
      }).then((article) => {
        resolve({
          message: 'Article deleted',
          data: article
        })
      }).catch((err) => {
        reject({
          message: 'Article delete failed',
          err: err
        })
      })
    })
  }
}
module.exports = Model;
