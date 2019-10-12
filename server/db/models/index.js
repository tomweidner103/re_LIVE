const Message = require('./message')
const User = require('./users')

Message.belongsTo(User)
User.hasMany(Message)

module.exports = {Message, User}