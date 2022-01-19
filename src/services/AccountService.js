const AccountDAO = require("../dao/AccountDAO")

class AccountService {
    async test() {
        return 1
    }

    async createAccount(acc) {
        return await AccountDAO.createAccount(acc)
    }

    async updateAccount(acc) {
        return await AccountDAO.updateAccount(acc)
    }

    async getAll() {
        const account = await AccountDAO.getAll()

        return account
    }

    async delete(_id) {
        const account = await AccountDAO.delete(_id)

        return account
    }
}

module.exports = new AccountService()