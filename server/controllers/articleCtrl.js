const Article = require('../models/article')
class ArticleCtrl {
  static read (req, res, next) {
    Article.read().then((articles) => {
      res.status(200).send(articles)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = ArticleCtrl;
