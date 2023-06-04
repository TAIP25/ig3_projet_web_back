// Importe les modules nécessaires
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// Créer une application express
const app = express();

// Ajoute des headers pour sécuriser l'application
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Utilise les routes pour l'authentification
app.use('/auth', require('./routes/authRoutes'));

// Utilise les routes pour les utilisateurs en jeu
app.use('/userGame', require('./routes/userGameRoutes'));

// Utilise les routes pour les cultures
app.use('/crop', require('./routes/cropRoutes'));

// Utilise les routes pour les admins
app.use('/admin', require('./routes/adminRoutes'));

module.exports = app;