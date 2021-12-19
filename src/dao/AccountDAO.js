const mongoose = require('mongoose');
const AccountModel = require('../models/AccountModel');
const connect = require("./_connection");

class AccountDao {
    async test() {
        try {
            await connect();

            return { account: 'test' };
        } catch (e) {
            throw e;
        } finally {
            await mongoose.connection.close();
        }
    }

    async createAccount(acc) {
        try {
            await connect();
            return await AccountModel.create({
                email: acc.email,
                password: acc.password,
                avatar: acc.avatar,
                full_name: acc.full_name,
                phone: acc.phone,
                address: acc.address,
                role: acc.role,
            });
        } catch (e) {
            throw e;
        } finally {
            await mongoose.connection.close();
        }
    }

    async updateAccount(acc) {
        try {
            await connect();
            return await AccountModel.findByIdAndUpdate(
                acc._id,
                {
                    email: acc.email,
                    password: acc.password,
                    avatar: acc.avatar,
                    full_name: acc.full_name,
                    phone: acc.phone,
                    address: acc.address,
                    role: acc.role,
                },
                { new: true }
            );
        } catch (e) {
            throw e;
        } finally {
            await mongoose.connection.close();
        }
    }

    async getAll() {
        try {
            await connect();

            return await AccountModel.find().exec();
        } catch (e) {
            throw e;
        } finally {
            await mongoose.connection.close();
        }
    }

    async delete(_id) {
        try {
            await connect();

            return await AccountModel.findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            );
        } catch (e) {
            throw e;
        } finally {
            await mongoose.connection.close();
        }
    }
}

module.exports = new AccountDao();