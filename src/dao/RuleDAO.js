const mongoose = require('mongoose')
const RuleModel = require('../models/RuleModel')
// const Connection = require("../utils/_Connection")

class RuleDao {
    async createRule(rule) {
        return await RuleModel.create(rule)
    }

    async getByOwner(owner_id) {
        return await RuleModel
            .find({
                deleted_at: null,
                owner: owner_id
            })
            .populate('located', "name address owner", { deleted_at: null })
            .populate('owner', "full_name email")
            .populate('sensor', "_id name owner")
            .populate('machine', "_id name owner")
            .exec()
    }

    async updateRule(rule) {
        return await RuleModel
            .findByIdAndUpdate(
                rule._id,
                rule,
                { new: true }
            )
    }

    async getAll() {
        return await RuleModel
            .find({ deleted_at: null })
            .populate('located', "name address owner", { deleted_at: null })
            .populate('owner', "full_name email")
            .populate('sensor', "_id name owner")
            .populate('machine', "_id name owner")
            .exec()
    }

    async deleteRule(_id) {
        return await RuleModel
            .findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
    }

    async setState(_id, state) {
        return await RuleModel
            .findByIdAndUpdate(
                _id,
                {
                    state: state
                },
                { new: true }
            )
    }
}

module.exports = new RuleDao()