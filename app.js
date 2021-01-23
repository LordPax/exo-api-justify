const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const apiRoute = require('./src/routes/api_routes')

const { PORT } = process.env

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use('/api', apiRoute)

app.listen(PORT, () => console.log('Ecoute sur le port', PORT, '...'))