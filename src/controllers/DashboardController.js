const Extension = require("../utils/Extension")
const AccountService = require("../services/AccountService")

class AccountController {
    // Trả về giao diện dashboard
    async get(req, res, next) {
        try {
            return res.render('_layout', { page: 'dashboard'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccountController()