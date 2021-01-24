const { userExist, addUser, searchUserByEmail, changeWordCount } = require('../models/user_model')
const { escapeHtml, justify, emailVerif } = require('./utils')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = async data => {
    if (data.email === '' || data.email === undefined) return {code : 400, msg : 'Missing Parameters'}
    if (!emailVerif(data.email)) return {code : 400, msg : 'Not an email'}
    if (await userExist(data.email)) return {code : 400, msg : 'User already exist'}
    
    const email = escapeHtml(data.email)
    const token = jwt.sign({ email }, process.env.JWT_SECRET)
    addUser({ email, token})

    return {code : 200, msg : token}
}

const justifyVerif = async data => {
    if (data.text === '' || data.text === undefined || data.token === '' || data.token === undefined) 
        return {code : 400, msg : 'Missing Parameters'}

    let tokenInfo
    try {
        tokenInfo = jwt.verify(data.token, process.env.JWT_SECRET)
    } catch(e) {
        return {code : 400, msg : 'Invalide Token'}
    }

    if (!await userExist(tokenInfo.email)) return {code : 400, msg : 'User doesn\'t exist'}

    const info = (await searchUserByEmail(tokenInfo.email))[0]
    const limit = info.wordCount + data.text.split(' ').length
    if (info.premium === 0 && limit >= process.env.WORD_LIMIT) return {code : 402, msg : 'Payment Required'}
    const justifiedText = justify(data.text)
    changeWordCount(limit, info.id)

    return {code : 200, msg : justifiedText}
}

module.exports = { createUser, justifyVerif }