const mongoose = require('mongoose')
const SensorModel = require('../models/SensorModel')
// const Connection = require("../utils/_Connection")

class SensorDao {
    async getAll() {
        try {
            // await Connection.connect()

            return await SensorModel
                .find({ deleted_at: null })
                .populate('located', "name address owner", { deleted_at: null })
                .populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async getByOwner(owner_id) {
        try {
            // await Connection.connect()

            return await SensorModel.find({
                deleted_at: null,
                owner: owner_id
            }).populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async createSensor(sensor) {
        try {
            // await Connection.connect()
            return await SensorModel.create({
                name: sensor.name,
                digitalName: sensor.digitalName,
                located: sensor.located,
                owner: sensor.owner,
            })
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async updateSensor(sensor) {
        try {
            // await Connection.connect()
            return await SensorModel.findByIdAndUpdate(
                sensor._id,
                {
                    name: sensor.name,
                    located: sensor.located,
                    owner: sensor.owner,
                },
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            // await Connection.close()
        }
    }

    async deleteSensor(_id) {
        try {
            // await Connection.connect()

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
            // await Connection.close()
        }
    }
}

module.exports = new SensorDao()