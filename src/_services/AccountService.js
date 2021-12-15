const AccountDAO = require("../_dao/AccountDAO");

class AccountService {
    async test() {
        return await AccountDAO.test();
    }

    async createAccount(acc) {
        const {email, role} = await AccountDAO.createAccount(acc);
        
        return {email, role};
    }
}

module.exports = new AccountService();