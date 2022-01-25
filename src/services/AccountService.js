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
        console.log(email, password)

        const [account] = await AccountDAO.getAccountByEmail(email)
        if (account) {
            if (await checkPassword(password, account.password)) {
                console.log("Login success")
                return {
                    '_id': account._id,
                    'role': account.role,
                    'token': await signToken(account._id)
                }
            }
        }

        return null
    }
}

module.exports = new AccountService()