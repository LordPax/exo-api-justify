const assert = require('assert')
const { addUser, userExist } = require('../src/models/user_model')
// const { query } = require('../src/models/mysql')

describe('test of user model', () => {
    describe('#userExist()', () => {
        const email = 'azerty@aze.fr'
        const email1 = 'azertyzer@areze.rfr'

        it('should exist', async () => {
            const res = await userExist(email)
            assert.equal(res, true)
        })
        it('should not exist', async () => {
            const res = await userExist(email1)
            assert.equal(res, false)
        })
    })
})