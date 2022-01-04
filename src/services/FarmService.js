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
}

module.exports = new FarmService()