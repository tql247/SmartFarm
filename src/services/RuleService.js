const RuleDAO = require("../dao/RuleDAO")

class RuleService {
    async test() {
        return await RuleDAO.test()
    }

    async createRule(rule) {
        return await RuleDAO.createRule(rule)
    }

    async getAll() {
        return await RuleDAO.getAll()
    }

    async updateRule(rule) {
        return await RuleDAO.updateRule(rule)
    }

    async deleteRule(_id) {
        return await RuleDAO.deleteRule(_id)
    }
}

module.exports = new RuleService()