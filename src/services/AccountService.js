const AccountDAO = require("../dao/AccountDAO")
const { checkPassword, signToken } = require("../utils/Extension")

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

    async login(email, password) {
        const account = await AccountDAO.getAccountByEmail(email)
        if (!account) {
            if (checkPassword(password, account.password)) {
                console.log("Login success")
                return signToken(account._id)
            }
        }

        const e = new Error();
        e.status = 401
        e.name = "Unauthorized"
        e.message = "Incorrect email or password"
        throw e
    }
}

module.exports = new AccountService()