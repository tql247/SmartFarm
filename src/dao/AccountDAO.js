const mongoose = require('mongoose')
const AccountModel = require('../models/AccountModel')
// const Connection = require("../utils/_Connection")

class AccountDao {
    async createAccount(acc) {
        return await AccountModel
            .create({
                email: acc.email,
                password: acc.password,
                avatar: acc.avatar,
                full_name: acc.full_name,
                phone: acc.phone,
                address: acc.address,
                role: acc.role,
            })
    }

    async updateAccount(acc) {
        return await AccountModel
            .findByIdAndUpdate(
                acc._id,
                {
                    $set: acc
                },
                { new: true }
            )
    }

    async getAll() {
        return await AccountModel
            .find({
                deleted_at: null
            })
            .exec()
    }

    async getByID(_id) {
        return await AccountModel
            .find({
                _id: _id,
                deleted_at: null
            })
            .exec()
    }

    async delete(_id) {
        return await AccountModel
            .findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
    }

    async getAccountByEmail(email) {
        return await AccountModel
            .find({ 
                deleted_at: null,
                email: email
            })
            .exec()
    }
}

module.exports = new AccountDao()