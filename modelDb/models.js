const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'user',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        isAdmin: {type: DataTypes.STRING, defaultValue: false}
    }
)

const Passing = sequelize.define(
    'userPassing',
    {
        userId: {type: DataTypes.INTEGER},
        quizId: {type: DataTypes.INTEGER},
        correctAnswers: { type: DataTypes.INTEGER },
        incorrectAnswers: { type: DataTypes.INTEGER }
    }
)

const Quiz = sequelize.define(
    'quizzes',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, unique: true },
        info: { type: DataTypes.JSON }
    }
)

User.hasMany(Passing);
Passing.belongsTo(User);


module.exports = { User, Passing, Quiz }