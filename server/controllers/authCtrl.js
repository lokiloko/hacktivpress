const User = require('../models/user')

class AuthCtrl {
  static login (req, res, next) {
    User.login(req.body.username, req.body.password).then((result) => {
      res.status(200).send(result)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static register (req, res, next) {
    User.register(req.body).then((user) => {
      res.status(200).send(user)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = AuthCtrl;
