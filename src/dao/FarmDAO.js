const mongoose = require('mongoose')
const FarmModel = require('../models/FarmModel')
// const Connection = require("../utils/_Connection")

class FarmDao {
    async getAll() {
        return await FarmModel
            .find({
                deleted_at: null
            })
            .populate('owner', "full_name email")
            .exec()
    }

    async getByOwner(owner_id) {
        return await FarmModel
            .find({
                deleted_at: null,
                owner: owner_id
            })
            .populate('owner', "full_name email")
            .exec()
    }

    async createFarm(farm) {
        return await FarmModel
            .create({
                name: farm.name,
                address: farm.address,
                owner: farm.owner,
            })
    }

    async updateFarm(farm) {
        return await FarmModel
            .findByIdAndUpdate(
                farm._id,
                {
                    name: farm.name,
                    address: farm.address,
                    owner: farm.owner,
                },
                { new: true }
            )
            .populate('owner', "full_name email")
            .exec()
    }

    async deleteFarm(_id) {
        return await FarmModel
            .findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
    }
}

module.exports = new FarmDao()