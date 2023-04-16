// Description: c'est le fichier principal du serveur

// Importer le module http
const http = require("http");

// Empêche le programme de crasher en production, car il n'y pas dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Importer le module app
const app = require("./app");

// Importer le module sequelize
const sequelize = require("./database/sequelize");

// Charge les models de la base de données pour que Sequelize puisse les synchroniser
require("./models/index");

// Voici le port sur lequel le serveur va écouter
const PORT = process.env.PORT || 7778;

sequelize
    // Se connecte à la base de données
    .authenticate()
    .then(() => {
        console.log("Database connection established.");

        // Synchronise les modèles avec la base de données
        // Force: true supprime la base de données et la recrée
        // Attention à ne pas l'utiliser en production!!!
        return sequelize.sync({ force: true });
    })
    .then(() => {
        console.log("Database models synced.");

        // Créer une application express
        const server = http.createServer(app);

        // Ouvre le serveur sur le port, ici 7778
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database or sync models:', error);
    });