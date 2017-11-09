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
  static readOne (req, res, next) {
    Article.readOne(req.params.id).then((article) => {
      res.status(200).send(article)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static readByAuthor (req, res, next) {
    Article.readByAuthor(req.params.author).then((articles) => {
      res.status(200).send(articles)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static readByCategory (req, res, next) {
    Article.readByCategory(req.params.category).then((articles) => {
      res.status(200).send(articles)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static create (req, res, next) {
    if (req.body.author) {
      req.body.author = jwtverify(req.body.author)
    }
    Article.create(req.body).then((article) => {
      res.status(200).send(article)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static delete (req, res, next) {
    Article.delete(req.params.id).then((article) => {
      res.status(200).send(article)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static update (req, res, next) {
    req.body._id = req.params.id
    if (req.body.author) {
      req.body.author = jwtverify(req.body.author)
    }
    Article.update(req.body).then((article) => {
      res.status(200).send(article)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = ArticleCtrl;
