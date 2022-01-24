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

        const err = new Error( "Incorrect email or password");
        err.status = 401
        err.name = "Unauthorized"
        throw err
    }
}

module.exports = new AccountService()