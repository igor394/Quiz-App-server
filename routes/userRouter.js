const Router = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()
const TokenCheckMiddleware = require('../middleware/TokenCheckMiddleware')



router.post('/reg', userControllers.registr)
router.post('/login', userControllers.login)
router.get('/auth',TokenCheckMiddleware, userControllers.check)

module.exports = router;