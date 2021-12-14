const AccountDAO = require("../_dao/AccountDAO");

class AccountService {
    async test() {
        return await AccountDAO.test();
    }
}

module.exports = new AccountService();