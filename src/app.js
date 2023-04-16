// Importe les modules nécessaires
const express = require('express');
const helmet = require('helmet');

// Créer une application express
const app = express();

// Ajoute des headers pour sécuriser l'application
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let uptimeObj = { uptime: process.uptime() }
    let uptimeStr = JSON.stringify(uptimeObj);
    res.status(200).send(uptimeStr);
})

// Utilise les routes pour l'authentification
app.use('/auth', require('./routes/authRoutes'));

module.exports = app;