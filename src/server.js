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
    //return sequelize.sync({ force: true });
    return sequelize.sync();
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
.then(() => {
    // Créer les tables de la base de données pour les crops
    const Crop = require("./models/Crop");
    Crop.bulkCreate([
        {
            cropName: "Navet",
            cropPNGName: "turnip",
            cropTier: 1,
            cropMoneyPrice: 250,
            cropTokenPrice: 105,
            cropMoneyEarning: 10,
            cropAmountEarningOneToken: 200
        },
        {
            cropName: "Rose",
            cropPNGName: "rose",
            cropTier: 2,
            cropMoneyPrice: 1500,
            cropTokenPrice: 10,
            cropMoneyEarning: 15,
            cropAmountEarningOneToken: 199
        },
        {
            cropName: "Comcombre",
            cropPNGName: "cucumber",
            cropTier: 3,
            cropMoneyPrice: 5000,
            cropTokenPrice: 15,
            cropMoneyEarning: 25,
            cropAmountEarningOneToken: 198
        },
        {
            cropName: "Tuli",
            cropPNGName: "tulip",
            cropTier: 4,
            cropMoneyPrice: 25000,
            cropTokenPrice: 20,
            cropMoneyEarning: 50,
            cropAmountEarningOneToken: 197
        },
        {
            cropName: "Tomate",
            cropPNGName: "tomato",
            cropTier: 5,
            cropMoneyPrice: 75000,
            cropTokenPrice: 25,
            cropMoneyEarning: 75,
            cropAmountEarningOneToken: 196
        },
        {
            cropName: "Melon",
            cropPNGName: "melon",
            cropTier: 6,
            cropMoneyPrice: 175000,
            cropTokenPrice: 30,
            cropMoneyEarning: 100,
            cropAmountEarningOneToken: 194
        },
        {
            cropName: "Aubergine",
            cropPNGName: "eggplant",
            cropTier: 7,
            cropMoneyPrice: 500000,
            cropTokenPrice: 35,
            cropMoneyEarning: 150,
            cropAmountEarningOneToken: 192
        },
        {
            cropName: "Citron",
            cropPNGName: "lemon",
            cropTier: 8,
            cropMoneyPrice: 1100000,
            cropTokenPrice: 40,
            cropMoneyEarning: 200,
            cropAmountEarningOneToken: 190
        },
        {
            cropName: "Ananas",
            cropPNGName: "pineapple",
            cropTier: 9,
            cropMoneyPrice: 2150000,
            cropTokenPrice: 45,
            cropMoneyEarning: 250,
            cropAmountEarningOneToken: 188
        },
        {
            cropName: "Riz",
            cropPNGName: "rice",
            cropTier: 10,
            cropMoneyPrice: 4500000,
            cropTokenPrice: 50,
            cropMoneyEarning: 325,
            cropAmountEarningOneToken: 186
        },
        {
            cropName: "Blé",
            cropPNGName: "wheat",
            cropTier: 11,
            cropMoneyPrice: 9000000,
            cropTokenPrice: 55,
            cropMoneyEarning: 400,
            cropAmountEarningOneToken: 183
        },
        {
            cropName: "Raisin",
            cropPNGName: "grapes",
            cropTier: 12,
            cropMoneyPrice: 15500000,
            cropTokenPrice: 60,
            cropMoneyEarning: 500,
            cropAmountEarningOneToken: 180
        },
        {
            cropName: "Fraise",
            cropPNGName: "strawberry",
            cropTier: 13,
            cropMoneyPrice: 42000000,
            cropTokenPrice: 65,
            cropMoneyEarning: 750,
            cropAmountEarningOneToken: 177
        },
        {
            cropName: "Manioc",
            cropPNGName: "cassava",
            cropTier: 14,
            cropMoneyPrice: 88500000,
            cropTokenPrice: 70,
            cropMoneyEarning: 1000,
            cropAmountEarningOneToken: 174
        },
        {
            cropName: "Patate",
            cropPNGName: "potato",
            cropTier: 15,
            cropMoneyPrice: 235000000,
            cropTokenPrice: 75,
            cropMoneyEarning: 1500,
            cropAmountEarningOneToken: 171
        },
        {
            cropName: "Café",
            cropPNGName: "coffee",
            cropTier: 16,
            cropMoneyPrice: 750000000,
            cropTokenPrice: 80,
            cropMoneyEarning: 2500,
            cropAmountEarningOneToken: 167
        },
        {
            cropName: "Orange",
            cropPNGName: "orange",
            cropTier: 17,
            cropMoneyPrice: 1750000000,
            cropTokenPrice: 85,
            cropMoneyEarning: 3500,
            cropAmountEarningOneToken: 163
        },
        {
            cropName: "Avocat",
            cropPNGName: "avocado",
            cropTier: 18,
            cropMoneyPrice: 4000000000,
            cropTokenPrice: 90,
            cropMoneyEarning: 5000,
            cropAmountEarningOneToken: 159
        },
        {
            cropName: "Maïs",
            cropPNGName: "corn",
            cropTier: 19,
            cropMoneyPrice: 10500000000,
            cropTokenPrice: 95,
            cropMoneyEarning: 7500,
            cropAmountEarningOneToken: 155
        },
        {
            cropName: "Tournesol",
            cropPNGName: "sunflower",
            cropTier: 20,
            cropMoneyPrice: 21000000000,
            cropTokenPrice: 100,
            cropMoneyEarning: 10000,
            cropAmountEarningOneToken: 151
        }
    ])
    .catch((error) => {
        // Ici => ce n'est pas la première fois que l'on lance l'application
    });   
})
.catch((error) => {
    console.error('Unable to connect to the database or sync models:', error);
});