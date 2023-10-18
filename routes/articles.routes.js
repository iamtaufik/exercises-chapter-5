var express = require('express');
var router = express.Router();
const { createArticle, getAllArticles, getUpdate } = require('../controllers/articles.controllers');

router.post('/', createArticle);
router.get('/', getAllArticles);
router.put('/:id', getUpdate); 

module.exports = router;
