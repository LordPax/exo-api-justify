const app = require('express').Router()
const { justify, escapeHtml } = require('../include/utils')
const { createUser, justifyVerif } = require('../include/user_utils')
const { addUser, userExist } = require('../models/user_model')

app.get('/coffee', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(418).send('I\'m a teapot')
})

app.post('/justify', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    const { code, msg } = await justifyVerif(req.body)
    res.status(code).send(msg)
})

app.post('/token', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    const { code, msg } = await createUser(req.body)
    res.status(code).send(msg)
})

module.exports = app