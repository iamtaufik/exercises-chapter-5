var express = require('express');
var router = express.Router();
const { create, deleteUser, getUserById } = require('../controllers/users.controllers');
/* GET users listing. */
router.post('/', create);
router.get('/:id', getUserById);
router.delete('/', deleteUser);

module.exports = router;
