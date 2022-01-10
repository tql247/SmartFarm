const mongoose = require('mongoose')
const RuleModel = require('../models/RuleModel')
const Connection = require("./_Connection")

class RuleDao {
    async test() {
        try {
            await Connection.connect()

            return { ruleount: 'test' }
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async createRule(rule) {
        try {
            await Connection.connect()
            return await RuleModel.create({
                name: rule.name,
                sensor: rule.sensor,
                machine: rule.machine,
                time: rule.time,
                thresholdUp: rule.thresholdUp,
                thresholdDown: rule.thresholdDown
            })
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    // async updateRule(rule) {
    //     try {
    //         await Connection.connect()
    //         return await RuleModel.findByIdAndUpdate(
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
    //         await Connection.close()
    //     }
    // }

    // async getAll() {
    //     try {
    //         await Connection.connect()

    //         return await RuleModel.find().exec()
    //     } catch (e) {
    //         throw e
    //     } finally {
    //         await Connection.close()
    //     }
    // }

    // async delete(_id) {
    //     try {
    //         await Connection.connect()

    //         return await RuleModel.findByIdAndUpdate(
    //             _id,
    //             {
    //                 deleted_at: Date.now()
    //             },
    //             { new: true }
    //         )
    //     } catch (e) {
    //         throw e
    //     } finally {
    //         await Connection.close()
    //     }
    // }
}

module.exports = new RuleDao()