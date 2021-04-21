const {User, Passing} = require('../modelDb/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ErrorApi = require('../error/Error')


const generateJWT = (id, email) => (jwt.sign({id, email}, process.env.SECRET_KEY, {expiresIn: '20h'}));

class UserControllers {
    async registr(req, res, next) {
        const {name, password, email, isAdmin} = req.body
        if (!name || !password || !email) {
            return next(ErrorApi.badRequest('user data is not filled in correctly'))
        }
        const newUser = await User.findOne({where: {email}})
        if (newUser) {
            return next(ErrorApi.badRequest('user with this email already exists'))
        }
        const hashPass = await bcrypt.hash(password, 4)
        const user = await User.create({name, password: hashPass, email, isAdmin})
        const token = generateJWT(user.id, email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {name, password} = req.body
        const user = await User.findOne({where: {name}})
        if (!user) {
            return next(ErrorApi.internal('user not found'))
        }
        let checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            return next(ErrorApi.internal('user not found'))
        }
        const arr = await Passing.findAll({where: {userId: user.id}});
        const token = generateJWT(user.id, user.email)
        return res.json({token, user, arr})

    }

    async check(req, res, next) {
        const user = await User.findOne({where: {id: req.user.id}})
        const token = generateJWT(req.user.id, req.user.email)
        const arr = await Passing.findAll({where: {userId: user.id}});
        return res.json({token, user, arr})
    }

    async passingUser(req, res, next) {
        const {userId, quizId, correctAnswers, incorrectAnswers} = req.body

        const variant = await Passing.findOne({where: {userId: userId, quizId: quizId}})

        if (variant) {
            await Passing.update(
                {correctAnswers: correctAnswers, incorrectAnswers: incorrectAnswers},
                {where: {userId: userId, quizId: quizId}})
        } else await Passing.create({userId, quizId, correctAnswers, incorrectAnswers});
        const arr = await Passing.findAll({where: {userId: userId}});
        return res.json(arr)
    }
}

module.exports = new UserControllers()