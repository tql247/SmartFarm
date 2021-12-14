class AccountController {
    async test(req, res, next) {
        try {
            res.status(201).json({account: 'test'});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AccountController();