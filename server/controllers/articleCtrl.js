const Article = require('../models/article')
const jwtverify = require('../helpers/jwtVerify')

class ArticleCtrl {
  static read (req, res, next) {
    Article.read().then((articles) => {
      res.status(200).send(articles)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static create (req, res, next) {
    req.body.author = jwtverify(req.body.author)
    Article.create(req.body).then((article) => {
      res.status(200).send(article)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = ArticleCtrl;
