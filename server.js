// Description: c'est le fichier principal du serveur

// Importer le module express
const express = require("express")

// Importer le module http
const http = require("http")

// Voici le port sur lequel le serveur va écouter
const PORT = 2534

// Créer une application express
const app = express()

// Renvoie à la requete GET de la racine le resultat "Hello World!"
app.get("/", (req, res) => {
    res.send("Hello World!")
})


// Renvoie à la requete GET de la branche /Test le resultat "Ceci est un test" avec la valeur de la variable "value"
app.get("/Test", (req, res) => {
    res.send("Ceci est un test, la valeur de la variable est: " + req.query.value)
})

// Ouvre le serveur sur le port 2534
app.listen(2534, () => {
    console.log("Server is running on port 2534: http://localhost:2534")
})