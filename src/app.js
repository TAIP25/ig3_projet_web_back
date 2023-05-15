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

app.get('/', (req, res) => {
    let uptimeObj = { uptime: process.uptime() }
    let uptimeStr = JSON.stringify(uptimeObj);
    res.status(200).send(uptimeStr);
})

// Utilise les routes pour l'authentification
app.use('/auth', require('./routes/authRoutes'));

// Ceci permet d'autoriser les requêtes provenant du frontend
const whitelist = ['http://localhost:3000', 'http://localhost:3000/inscription', 'http://localhost:3000/connection', 'http://172.21.209.26:3000/inscription', 'http://172.21.209.26:3000'];


module.exports = app;