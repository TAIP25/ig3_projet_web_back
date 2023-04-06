const express = require('express')


const router = express.Router()

//Routes for the application
/*
router.use('/auth', require('./routes/auth'))
router.use('/game', require('./routes/game'))
router.use('/user', require('./routes/plot'))
router.use('/stats', require('./routes/stats'))
router.use('/upgrade', require('./routes/upgrade'))
router.use('/plot', require('./routes/plot'))
*/

router.get('/', (req, res) => {
    let random = Math.floor(Math.random() * 100)
    res.status(200).redirect(`/auth/game/${random}`)
})

router.get('/auth', (req, res) => {
    res.status(200).send("Page d'authentification")
})

// get to read
router.get("/game/:id", (req, res) => {
    let id = req.params.id
    if(!id || isNaN(id)){
        res.status(400).send("Bad request")
    }
    res.status(200).send(`Page avec l'id ${id}`)
})

// post to create
router.post("/game", (req, res) => {
    let [name, description, price] = [req.body.name, req.body.description, req.body.price]
    if(!name || !description || !price){
        res.status(400).send("Bad request")
    }
    res.status(200).send(`Product created the information is: name: ${name}, description: ${description}, price: ${price}`)
})

// put to update
router.post("/game/:id/price", (req, res) => {
    let id = req.params.id
    let price = req.body.price
    if(!id || isNaN(id) || !price || isNaN(price)){
        res.status(400).send("Bad request")
    }
    res.status(200).send(`Page de modification de jeu avec l'id ${id} et le prix ${price}`)
})

// delete to delete
router.delete("/game/:id", (req, res) => {
    let id = req.params.id
    if(!id || isNaN(id)){
        res.status(400).send("Bad request")
    }
    res.status(200).send(`Page de suppression de jeu avec l'id ${id}`)
})

module.exports = router