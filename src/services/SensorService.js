const SensorDAO = require("../dao/SensorDAO")

class SensorService {
    async test() {
        return await SensorDAO.test()
    }

    async getAll() {
        return await SensorDAO.getAll()
    }

    async getByOwner(owner_id) {
        return await SensorDAO.getByOwner(owner_id)
    }

    async getValue(sensorID) {
        return await realtimeDatabase.getDataByKey(sensorID)
    }

    async createSensor(sensor) {
        return await SensorDAO.createSensor(sensor)
    }

    async updateSensor(sensor) {
        return await SensorDAO.updateSensor(sensor)
    }

    async deleteSensor(_id) {
        return await SensorDAO.deleteSensor(_id)
    }
}

module.exports = new SensorService()