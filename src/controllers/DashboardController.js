const Extension = require("../utils/Extension");
const AccountService = require("../services/AccountService");
const FarmService = require("../services/FarmService");
const SensorService = require("../services/SensorService");
const MachineService = require("../services/MachineService");
const RuleService = require("../services/RuleService");

class AccountController {
    // Trả về giao diện dashboard
    async get(req, res, next) {
        try {
            const accounts = await AccountService.getAll();
            const farms = await FarmService.getAll();
            const sensors = await SensorService.getAll();
            const machines = await MachineService.getAll();
            const rules = await RuleService.getAll();

            return res.render("_layout", {
                page: "dashboard",
                numAccount: accounts.length,
                numFarm: farms.length,
                numSensor: sensors.length,
                numMachine: machines.length,
                numRule: rules.length,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AccountController();
