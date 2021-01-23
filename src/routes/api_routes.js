const app = require('express').Router()
const { justify } = require('../include/utils')

app.get('/coffee', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(418).send('I\'m a teapot')
})

app.post('/justify', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    if (req.body.text !== '' && req.body.text !== undefined)
        res.status(200).send(justify(req.body.text))
    else
        res.status(400).send('Missing parameters')
})

app.post('/token', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    // res.status(200).send('test')
})

module.exports = app