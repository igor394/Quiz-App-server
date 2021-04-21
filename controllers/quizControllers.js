const { Quiz, Passing, User } = require('../modelDb/models')
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
    async getResult(req, res) {
        let params = req.params.id
        const decoded = Buffer.from(params, 'base64').toString('binary')
        const result = await Passing.findOne({where:{id:decoded}})
        const user = await User.findOne({where:{id:result.userId}})
        const quiz = await Quiz.findOne({where:{id:result.quizId+1}})
        return res.json({ 'user': user.name, "quiz": quiz.title, "result": result.correctAnswers})
    }


}
module.exports = new QuizControllers()