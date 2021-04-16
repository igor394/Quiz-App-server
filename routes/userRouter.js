const Router = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()



router.post('/reg', userControllers.registr)
router.post('/login', userControllers.login)
router.get('/auth', userControllers.check)

module.exports = router;