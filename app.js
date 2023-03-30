// Description: This file is the entry point for the application

const express = require('express')

const helmet = require('helmet')

const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    let uptimeObj = {uptime: process.uptime()}
    let uptimeStr = JSON.stringify(uptimeObj)
    res.status(200).send(uptimeStr)
})

app.get('/api', (req, res) => {
    res.status(200).send('API is running')
})

app.use('/auth', authRoutes)

module.exports = app