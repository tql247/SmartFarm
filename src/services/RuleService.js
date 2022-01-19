const RuleDAO = require("../dao/RuleDAO")

class RuleService {
    async getByOwner(owner_id) {
        return await RuleDAO.getByOwner(owner_id)
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

    async setState(_id, state) {
        return await RuleDAO.setState(_id, state)
    }
}

module.exports = new RuleService()