var express = require('express');
var router = express.Router();
const { getAllArticles } = require('../libs/articles.libs');


/* GET articles listing. */
router.get('/', getAllArticles);


module.exports = router;
