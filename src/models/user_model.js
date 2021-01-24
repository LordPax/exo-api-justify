const { db, query } = require('./mysql')

const addUser = async data =>
    await query('INSERT INTO user SET ?', data)

const changeWordCount = async (wordCount, id) =>
    await query('UPDATE user SET wordCount = ? WHERE id = ?', [wordCount, id])

const searchUserByToken = async token =>
    await query('SELECT * FROM user WHERE token = ?', [token])

const searchUserByEmail = async email =>
    await query('SELECT * FROM user WHERE email = ?', [email])

const userExist = async email => {
    const res = await query('SELECT COUNT(*) AS nb FROM user WHERE email = ?', [email])
    return res[0].nb === 1
}

module.exports = { addUser, searchUserByToken, userExist, searchUserByEmail, changeWordCount }