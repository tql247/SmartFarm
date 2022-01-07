const FarmDAO = require("../dao/FarmDAO")

class FarmService {
    async test() {
        return await FarmDAO.test()
    }

    async getAll() {
        return await FarmDAO.getAll()
    }

    async getByOwner(owner_id) {
        return await FarmDAO.getByOwner(owner_id)
    }

    async createFarm(farm) {
        return await FarmDAO.createFarm(farm)
    }

    async updateFarm(farm) {
        return await FarmDAO.updateFarm(farm)
    }

    async deleteFarm(_id) {
        return await FarmDAO.deleteFarm(_id)
    }
}

module.exports = new FarmService()