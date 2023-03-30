// Description: c'est le fichier principal du serveur

// Importer le module http
const http = require("http")

// Importer le module app
const app = require("./app")

// Voici le port sur lequel le serveur va écouter
const PORT = 2534

// Créer une application express
const server = http.createServer(app)

// Ouvre le serveur sur le port 2534
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`)
})