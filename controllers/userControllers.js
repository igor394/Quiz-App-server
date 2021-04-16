class UserControllers {
     registr(req, res, next) {

        return res.json({ message: 'registr'})
    }

     login(req, res, next) {

        return res.json({ message: 'login'})

    }
     check(req, res, next) {

        return res.json({ message: 'check' })
    }
}
module.exports = new UserControllers()