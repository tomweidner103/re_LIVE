const Sequelize = require('sequelize')
const db = require('../db')


const uuid = {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
}

const User = db.define('user', {
    id: uuid,
    name: {
        type: Sequelize.STRING
    }
})

module.exports = User