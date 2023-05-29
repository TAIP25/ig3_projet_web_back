const express = require('express');

const userGameController = require('../controllers/userGameController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/', authMiddleware, userGameController.updateUserGame);

router.post('/upgrade', authMiddleware, userGameController.updateUserGame, userGameController.upgradeUserGame);

//router.post('/', authMiddleware);

module.exports = router;



