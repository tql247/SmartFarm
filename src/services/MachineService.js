const MachineDAO = require("../dao/MachineDAO")
var mqtt = require('mqtt')
const Extension = require("../utils/Extension")


class MachineService {
    async getAll() {
        return await MachineDAO.getAll()
    }

    async getByOwner(owner_id) {
        return await MachineDAO.getByOwner(owner_id)
    }

    async createMachine(machine) {
        return await MachineDAO.createMachine(machine)
    }

    async updateMachine(machine) {
        return await MachineDAO.updateMachine(machine)
    }

    async deleteMachine(_id) {
        return await MachineDAO.deleteMachine(_id)
    }

    async setState(_id, state) {
        mqttClient.publish(_id, state);
        Extension.sleep(1000)

        const value = await realtimeDatabase.getDataByKey(_id)
        return value
    }
}

module.exports = new MachineService()