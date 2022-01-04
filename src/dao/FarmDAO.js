const mongoose = require('mongoose')
const FarmModel = require('../models/FarmModel')
const connect = require("./_connection")

class FarmDao {
    async test() {
        try {
            await connect()

            return { ruleount: 'test' }
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async getAll() {
        try {
            await connect()

            return await FarmModel.find({
                deleted_at: null
            }).populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async createFarm(farm) {
        try {
            await connect()
            return await FarmModel.create({
                name: farm.name,
                address: farm.address,
                owner: farm.owner,
            })
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    // async updateFarm(rule) {
    //     try {
    //         await connect()
    //         return await FarmModel.findByIdAndUpdate(
    //             rule._id,
    //             {
    //                 email: rule.email,
    //                 password: rule.password,
    //                 avatar: rule.avatar,
    //                 full_name: rule.full_name,
    //                 phone: rule.phone,
    //                 address: rule.address,
    //                 role: rule.role,
    //             },
    //             { new: true }
    //         )
    //     } catch (e) {
    //         throw e
    //     } finally {
    //         await mongoose.connection.close()
    //     }
    // }

    // async delete(_id) {
    //     try {
    //         await connect()

    //         return await FarmModel.findByIdAndUpdate(
    //             _id,
    //             {
    //                 deleted_at: Date.now()
    //             },
    //             { new: true }
    //         )
    //     } catch (e) {
    //         throw e
    //     } finally {
    //         await mongoose.connection.close()
    //     }
    // }
}

module.exports = new FarmDao()