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
      Article.find({},{},{
        $sort:{
          created_at: -1
        }
      }).populate('author').then((articles) => {
        var obj = {
          message: 'Data Found',
          data: articles
        }
        resolve(obj)
      }).catch((err) => {
        var obj = {
          message: 'Error when get data',
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
      }).populate('author').then((article) => {
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
      },{}, {$sort:{created_at:-1}}).populate('author').then((articles) => {
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
      },{}, {$sort:{
        created_at: -1
      }}).populate('author').then((articles) => {
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
      Model.readOne(update._id).then((data) => {
        if(data.data.author._id.toString() === update.author) {
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
        } else {
          reject({
            message: 'Unauthorized',
          })
        }
      })
    })
  }
  static delete (id, author) {
    return new Promise((resolve, reject) => {
      Model.readOne(id).then((data) => {
        console.log(data.data.author._id)
        console.log(author)
        if(data.data.author._id.toString() === author) {
          console.log('sama')
          Article.findOneAndRemove({
            _id: id
          }).then((article) => {
            resolve({
              message: 'Article deleted',
              data: article
            })
          }).catch((err) => {
            console.log('sana')
            reject({
              message: 'Article delete failed',
              err: err
            })
          })
        } else {
          console.log('gasama')
          reject({
            message: 'Unauthorized',
          })
        }
      })
    })
  }
}
module.exports = Model;
