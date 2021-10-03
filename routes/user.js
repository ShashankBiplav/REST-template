const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getUserInfo);

router.post('/signup', userController.signUp);

router.post('/uploads', )

module.exports = router;
