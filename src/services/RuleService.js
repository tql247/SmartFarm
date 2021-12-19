const RuleDAO = require("../dao/RuleDAO");

class RuleService {
    async test() {
        return await RuleDAO.test();
    }

    async createRule(rule) {
        return await RuleDAO.createRule(rule);
    }
}

module.exports = new RuleService();