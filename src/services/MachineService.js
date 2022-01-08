const MachineDAO = require("../dao/MachineDAO")

class MachineService {
    async getAll() {
        return await MachineDAO.getAll()
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
}

module.exports = new MachineService()