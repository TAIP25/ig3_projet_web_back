const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//Routes pour l'autentification
router.get('/getAllUsers', authMiddleware, userController.getAllUsers);

router.delete('/delete/:userId', authMiddleware, userController.deleteUser);

module.exports = router;