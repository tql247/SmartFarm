const mongoose = require('mongoose')
const FarmModel = require('../models/FarmModel')
// const Connection = require("../utils/_Connection")

class FarmDao {
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

    async getAll() {
        try {
            // await Connection.connect()

            return await FarmModel.find({
                deleted_at: null
            }).populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async getByOwner(owner_id) {
        try {
            // await Connection.connect()

            return await FarmModel.find({
                deleted_at: null,
                owner: owner_id
            }).populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async createFarm(farm) {
        try {
            // await Connection.connect()
            return await FarmModel.create({
                name: farm.name,
                address: farm.address,
                owner: farm.owner,
            })
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async updateFarm(farm) {
        try {
            // await Connection.connect()
            return await FarmModel.findByIdAndUpdate(
                farm._id,
                {
                    name: farm.name,
                    address: farm.address,
                    owner: farm.owner,
                },
                { new: true }
            ).populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async deleteFarm(_id) {
        try {
            // await Connection.connect()

            return await FarmModel.findByIdAndUpdate(
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

module.exports = new FarmDao()