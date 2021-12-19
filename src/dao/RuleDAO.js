const mongoose = require('mongoose');
const RuleModel = require('../models/RuleModel');
const connect = require("./_connection");

class RuleDao {
    async test() {
        try {
            await connect();

            return { ruleount: 'test' };
        } catch (e) {
            throw e;
        } finally {
            await mongoose.connection.close();
        }
    }

    async createRule(rule) {
        try {
            await connect();
            return await RuleModel.create({
                name: rule.name,
                sensor: rule.sensor,
                machine: rule.machine,
                time: rule.time,
                threshold: rule.threshold
            });
        } catch (e) {
            throw e;
        } finally {
            await mongoose.connection.close();
        }
    }

    // async updateRule(rule) {
    //     try {
    //         await connect();
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
    //         );
    //     } catch (e) {
    //         throw e;
    //     } finally {
    //         await mongoose.connection.close();
    //     }
    // }

    // async getAll() {
    //     try {
    //         await connect();

    //         return await RuleModel.find().exec();
    //     } catch (e) {
    //         throw e;
    //     } finally {
    //         await mongoose.connection.close();
    //     }
    // }

    // async delete(_id) {
    //     try {
    //         await connect();

    //         return await RuleModel.findByIdAndUpdate(
    //             _id,
    //             {
    //                 deleted_at: Date.now()
    //             },
    //             { new: true }
    //         );
    //     } catch (e) {
    //         throw e;
    //     } finally {
    //         await mongoose.connection.close();
    //     }
    // }
}

module.exports = new RuleDao();