const FarmDAO = require("../dao/FarmDAO")

class FarmService {
    async test() {
        return await FarmDAO.test()
    }

    async getAll() {
        return await FarmDAO.getAll()
    }
}

module.exports = new FarmService()