const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

//Routes pour l'autentification
router.post('/signup', userController.createUser);

router.get('/login', (req, res) => {
    res.status(200).send('Page de login');
});

router.get('/logout', (req, res) => {
    res.status(200).redirect('/auth/login');
});

module.exports = router;



