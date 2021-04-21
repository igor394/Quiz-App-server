const Router = require('express')
const quizControllers = require('../controllers/quizControllers')
const router = new Router()





router.get('/list', quizControllers.getItem)
router.post('/create', quizControllers.create)
router.get('/:id', quizControllers.getResult)





module.exports = router;