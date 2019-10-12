const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost/${pkg.name}`, {logging: false})


const Message = db.define('message', {
    body: {
        type: Sequelize.TEXT,
    }
})

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    }
})

Message.belongsTo(User)
User.hasMany(Message)

module.exports = {
    db, User, Message
}