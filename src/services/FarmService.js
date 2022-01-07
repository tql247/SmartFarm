const FarmDAO = require("../dao/FarmDAO")

class FarmService {
    async test() {
        return await FarmDAO.test()
    }

    async getAll() {
        return await FarmDAO.getAll()
    }

    async createFarm(farm) {
        return await FarmDAO.createFarm(farm)
    }

    async updateFarm(farm) {
        return await FarmDAO.updateFarm(farm)
    }
}

module.exports = new FarmService()