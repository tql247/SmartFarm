const mongoose = require('mongoose')
const SensorModel = require('../models/SensorModel')
// const Connection = require("../utils/_Connection")

class SensorDao {
    async getAll() {
        return await SensorModel
            .find({ deleted_at: null })
            .populate('located', "name address owner", { deleted_at: null })
            .populate('owner', "full_name email").exec()
    }

    async getByOwner(owner_id) {

        return await SensorModel
            .find({
                deleted_at: null,
                owner: owner_id
            })
            .populate('located', "name address owner", { deleted_at: null })
            .populate('owner', "full_name email").exec()
    }

    async createSensor(sensor) {
        return await SensorModel
            .create({
                name: sensor.name,
                unit: sensor.unit,
                located: sensor.located,
                owner: sensor.owner,
            })
    }

    async updateSensor(sensor) {
        console.log(sensor.unit)
        return await SensorModel
            .findByIdAndUpdate(
                sensor._id,
                {
                    name: sensor.name,
                    unit: sensor.unit,
                    located: sensor.located,
                    owner: sensor.owner,
                },
                { new: true }
            )
    }

    async deleteSensor(_id) {
        return await SensorModel
            .findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
    }
}

module.exports = new SensorDao()