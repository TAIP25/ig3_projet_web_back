const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//Routes pour l'autentification
router.post('/signup', userController.createUser);

router.post('/signin', userController.loginUser);

router.post('/', authMiddleware);

module.exports = router;