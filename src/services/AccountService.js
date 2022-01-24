const AccountDAO = require("../dao/AccountDAO")
const { checkPassword, signToken } = require("../utils/Extension")

class AccountService {
    async createAccount(acc) {
        return await AccountDAO.createAccount(acc)
    }

    async updateAccount(acc) {
        return await AccountDAO.updateAccount(acc)
    }

    async getAll() {
        return await AccountDAO.getAll()
    }

    async getByID(_id) {
        return await AccountDAO.getByID(_id)
    }

    async delete(_id) {
        return await AccountDAO.delete(_id)
    }

    async login(email, password) {
        const [account] = await AccountDAO.getAccountByEmail(email)
        console.log(account)
        if (account) {
            if (checkPassword(password, account.password)) {
                console.log("Login success")
                return {
                    'role': account.role,
                    'token': signToken(account._id)
                }
            }
        }

        return null
    }
}

module.exports = new AccountService()