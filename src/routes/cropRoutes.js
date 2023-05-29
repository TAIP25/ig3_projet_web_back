const express = require('express');

const cropController = require('../controllers/cropController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, cropController.getAllCrops);

module.exports = router;