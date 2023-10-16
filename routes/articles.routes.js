var express = require('express');
var router = express.Router();
const { createArticle, getAllArticles } = require('../controllers/articles.controllers');

router.post('/', createArticle);
router.get('/', getAllArticles);

module.exports = router;
