const Router = require('express')
const quizControllers = require('../controllers/quizControllers')
const router = new Router()





router.get('/list', quizControllers.getItem)
router.post('/create', quizControllers.create)
router.post('/del', quizControllers.delete)





module.exports = router;