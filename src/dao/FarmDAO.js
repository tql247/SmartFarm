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

    async getByOwner(owner_id) {
        try {
            await connect()

            return await FarmModel.find({
                deleted_at: null,
                owner: owner_id
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

    async updateFarm(farm) {
        try {
            await connect()
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
            await mongoose.connection.close()
        }
    }

    async deleteFarm(_id) {
        try {
            await connect()

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
            await mongoose.connection.close()
        }
    }
}

module.exports = new FarmDao()