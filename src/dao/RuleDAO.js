const mongoose = require('mongoose')
const RuleModel = require('../models/RuleModel')
// const Connection = require("../utils/_Connection")

class RuleDao {
    async test() {
        try {
            // await Connection.connect()

            return { ruleount: 'test' }
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async createRule(rule) {
        try {
            // await Connection.connect()
            return await RuleModel.create(rule)
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async updateRule(rule) {
        try {
            // await Connection.connect()
            return await RuleModel.findByIdAndUpdate(
                rule._id,
                rule,
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async getAll() {
        try {
            // await Connection.connect()

            return await RuleModel
                .find({ deleted_at: null })
                .populate('owner', "full_name email")
                .populate('sensor', "_id name owner")
                .populate('machine', "_id name owner")
                .exec()
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async deleteRule(_id) {
        try {
            // await Connection.connect()

            return await RuleModel.findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }
}

module.exports = new RuleDao()