var express = require('express');
var router = express.Router();
const { createArticle, getAllArticles, getUpdate, getDetailArticle, deleteArticleById } = require('../controllers/articles.controllers');

router.post('/', createArticle);
router.get('/', getAllArticles);
router.get('/:id', getDetailArticle);
router.put('/:id', getUpdate);
router.delete('/:id', deleteArticleById);

module.exports = router;
