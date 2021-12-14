const mongoose = require('mongoose');
const connect = require("./_connection");
const AccountModel = require("../../models/Account");

class AccountDao {
    async test() {
        try {
            await connect();

            return {account: 'test'};
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }
}

module.exports = new AccountDao();