var express = require('express');
var router = express.Router();
const { getAllArticles } = require('../controllers/articles.controllers');
/* GET articles listing. */

router.get('/:id', getAllArticles);

module.exports = router;
