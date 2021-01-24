const assert = require('assert')
const { createUser, justifyVerif } = require('../src/include/user_utils')
const { query } = require('../src/models/mysql')

describe('test of user utils', () => {
    describe('#createUser()', () => {
        const email = 'azerty@aze.fr'
        const email1 = ''
        const email2 = 'joe.mama@gmail.com'

        after(() => {
            query('delete from user where email = ?', [email2])
        })

        it('should already exist', async () => {
            const { code, msg } = await createUser({email})
            assert.equal(code, 400)
            assert.equal(msg, 'User already exist')
        })
        it('should return an error', async () => {
            const { code, msg } = await createUser({email : email1})
            assert.equal(code, 400)
            assert.equal(msg, 'Missing Parameters')
        })
        it('should create user', async () => {
            const { code, msg } = await createUser({email : email2})
            // console.log(code, msg)
            assert.equal(code, 200)
        })
    })

    describe('#justifyVerif()', () => {
        const text = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que'
        const expect = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\nmes yeux se fermaient si vite que'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXJ0QHF3ZS5mciIsImlhdCI6MTYxMTUwODY4MH0.4eMFiL13o5MA2G-xWS9Y68CfrA95TZ6GEUhgQNf1ULY'
        const token2 = 'eiousdfgsiurhkdfjhgsliujqhsldfiuqhlfkqjhfgqleiru'

        it('should justify', async () => {
            const { code, msg } = await justifyVerif({text, token})
            // console.log(msg)
            assert.equal(code, 200)
            assert.equal(msg, expect)
        })

        it('should not justify', async () => {
            const { code, msg } = await justifyVerif({text, token : token2})
            // console.log(msg)
            assert.equal(code, 400)
            assert.equal(msg, 'Invalide Token')
        })
    })
})