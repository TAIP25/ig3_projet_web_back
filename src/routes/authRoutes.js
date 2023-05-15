const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

//Routes pour l'autentification
router.post('/signup', userController.createUser);

router.post('/signin', userController.loginUser);

module.exports = router;



