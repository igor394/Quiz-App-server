const { Quiz } = require('../modelDb/models')
const ErrorApi = require('../error/Error')

class QuizControllers {

    async create(req, res) {
        const { title, info} = req.body
        const quiz = await Quiz.create({ title, info })
        return res.json({message: quiz})
    }

    async getItem(req, res) {
        const quizzes = await Quiz.findAll()
        return res.json(quizzes)
    }
    async delete(req, res) {

        const quiz = await Quiz.destroy({ where: {title: req.body.title}  })
        return res.json({message: quiz})
    }


}
module.exports = new QuizControllers()