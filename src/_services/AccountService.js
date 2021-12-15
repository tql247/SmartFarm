const AccountDAO = require("../_dao/AccountDAO");

class AccountService {
    async test() {
        return await AccountDAO.test();
    }

    async createAccount(acc) {
        return await AccountDAO.createAccount(acc);
    }

    async getAll() {
        const account = await AccountDAO.getAll();
        
        return account;
    }
}

module.exports = new AccountService();