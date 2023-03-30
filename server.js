// Description: c'est le fichier principal du serveur

// Importer le module express
const express = require("express")

// Importer le module http
const http = require("http")

// Voici le port sur lequel le serveur va écouter
const PORT = 2534

// Créer une application express
const app = express()

// Créer une sous-application express
const subAppAuth = express()

// Créer un route pour la sous-application
subAppAuth.get("/", (req, res) => {
    res.status(200).send("Ceci est la sous-application qui gère l'authentification")
})

// Utiliser la sous-application pour la route /subapp
app.use("/auth", subAppAuth)

// Middleware A
app.use((req, res, next) => {
    console.log('Middleware A');
    next();
});

// Middleware B
app.use((req, res, next) => {
    console.log('Middleware B');
    next();
});

// Ouvre le serveur sur le port 2534
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`)
})

// Renvoie à la requete GET de la racine le resultat "Hello World!"
app.get("/", (req, res) => {
    res.send("Page d'accueil, redirige sur /authentification (peut etre mise en place de cookie + tard)")
})

app.get("/authentification/login", (req, res) => {
    res.send("Page de connection")
})

app.get("/authentification/signin", (req, res) => {
    res.send("Page de creation de compte")
})

app.get("/game", (req, res) => {
    res.send("Page du jeu")
})

app.get("/game/statistique", (req, res) => {
    res.send("Page des statistiques")
})

app.get("/game/clan/recherche", (req, res) => {
    res.send("Page des recherche de clan")
})

app.get("/game/clan/:id/info", (req, res) => {
    res.send("Page des info d'un clan")
})

app.get("/game/amelioration", (req, res) => {
    res.send("Page des amelioration")
})

// Renvoie à la requete GET de la branche /Test le resultat "Ceci est un test" avec la valeur de la variable "value"
app.get("/test", (req, res) => {
    res.send("Ceci est un test, la valeur de la variable est: " + req.query.value)
})

app.get("/html", (req, res) => {
    res.sendFile(__dirname + "/test.html");
})

