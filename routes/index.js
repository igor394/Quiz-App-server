const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const quizRouter = require('./quizRouter')



router.use('/user', userRouter)
router.use('/quiz', quizRouter)

module.exports = router