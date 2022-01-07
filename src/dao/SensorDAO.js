const mongoose = require('mongoose')
const SensorModel = require('../models/SensorModel')
const connect = require("./_connection")

class SensorDao {
    async getAll() {
        try {
            await connect()

            return await SensorModel.find({
                deleted_at: null
            })
            .populate('located', "name address owner")
            .populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async createSensor(sensor) {
        try {
            await connect()
            return await SensorModel.create({
                name: sensor.name,
                digitalName: sensor.digitalName,
                located: sensor.located,
                owner: sensor.owner,
            })
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async updateSensor(sensor) {
        try {
            await connect()
            return await SensorModel.findByIdAndUpdate(
                sensor._id,
                {
                    name: sensor.name,
                    address: sensor.address,
                    owner: sensor.owner,
                },
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async deleteSensor(_id) {
        try {
            await connect()

            return await SensorModel.findByIdAndUpdate(
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

module.exports = new SensorDao()