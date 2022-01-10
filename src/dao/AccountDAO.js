const mongoose = require('mongoose')
const AccountModel = require('../models/AccountModel')
const Connection = require("./_Connection")

class AccountDao {
    async test() {
        try {
            await Connection.connect()

            return { account: 'test' }
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async createAccount(acc) {
        try {
            await Connection.connect()
            return await AccountModel.create({
                email: acc.email,
                password: acc.password,
                avatar: acc.avatar,
                full_name: acc.full_name,
                phone: acc.phone,
                address: acc.address,
                role: acc.role,
            })
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async updateAccount(acc) {
        try {
            await Connection.connect()
            return await AccountModel.findByIdAndUpdate(
                acc._id,
                {
                    $set: acc
                },
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async getAll() {
        try {
            await Connection.connect()

            return await AccountModel.find({
                deleted_at: null
            }).exec()
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async delete(_id) {
        try {
            await Connection.connect()

            return await AccountModel.findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }
}

module.exports = new AccountDao()