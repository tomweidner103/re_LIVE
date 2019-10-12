const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost/${pkg.name}`, {logging: false})
const uuid = {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
}

const Message = db.define('message', {
    id: uuid,
    body: {
        type: Sequelize.TEXT,
    }
})

const User = db.define('user', {
    id: uuid,
    name: {
        type: Sequelize.STRING
    }
})

Message.belongsTo(User)
User.hasMany(Message)

module.exports = {
    db, User, Message
}