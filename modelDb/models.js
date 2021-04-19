const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'user',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        isAdmin: {type: DataTypes.STRING, defaultValue: "USER"}
    }
)

const Passing = sequelize.define(
    'userPassing',
    {
        name: { type: DataTypes.STRING, unique: true },
        passing: { type: DataTypes.STRING }
    }
)

User.hasOne(Passing)
Passing.belongsTo(User)

module.exports = { User, Passing }