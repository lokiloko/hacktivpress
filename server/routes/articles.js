const express = require('express')
const router = express.Router()
const ArticleCtrl = require('../controllers/articleCtrl')

router.get('/', ArticleCtrl.read)
router.get('/:id', ArticleCtrl.readOne)
router.get('/author/:author', ArticleCtrl.readOne)
router.get('/category/:category', ArticleCtrl.readOne)
router.post('/', ArticleCtrl.create)
router.put('/:id', ArticleCtrl.update)
router.delete('/:id', ArticleCtrl.delete)

module.exports = router;
