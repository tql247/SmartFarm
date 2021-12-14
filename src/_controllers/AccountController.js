const AccountService = require("../_services/AccountService");

class AccountController {
    async test(req, res, next) {
        try {
            res.status(201).json(await AccountService.test());
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AccountController();