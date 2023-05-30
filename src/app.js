// Importe les modules nécessaires
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Créer une application express
const app = express();

// Ajoute des headers pour sécuriser l'application
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Dois autoriser seulement les requêtes provenant du frontend
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

// Utilise les routes pour l'authentification
app.use('/auth', require('./routes/authRoutes'));

// Utilise les routes pour les utilisateurs en jeu
app.use('/userGame', require('./routes/userGameRoutes'));

// Utilise les routes pour les cultures
app.use('/crop', require('./routes/cropRoutes'));

// Utilise les routes pour les admins
app.use('/admin', require('./routes/adminRoutes'));

// Ceci permet d'autoriser les requêtes provenant du frontend
const whitelist = ['http://localhost:3000', 'http://localhost:3000/inscription', 'http://localhost:3000/connection', 'http://172.21.209.26:3000/inscription', 'http://172.21.209.26:3000'];


module.exports = app;