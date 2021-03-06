const Extension = require("../utils/Extension");
const RuleService = require("../services/RuleService");
const MachineService = require("../services/MachineService");
const SensorService = require("../services/SensorService");
const FarmService = require("../services/FarmService");
const AccountService = require("../services/AccountService");

class RuleController {
    // lấy tẩt cả rule
    async getAll(req, res, next) {
        try {
            const rules = await RuleService.getAll();
            const accounts = await AccountService.getAll();
            let farms = [];
            let sensors = [];
            let machines = [];

            const [sampleSelect] = accounts;
            if (sampleSelect) {
                farms = await FarmService.getByOwner(sampleSelect._id);
                sensors = await SensorService.getByOwner(sampleSelect._id);
                machines = await MachineService.getByOwner(sampleSelect._id);
            }

            return res.render("_layout", {
                page: "rule",
                rules: rules,
                accounts: accounts,
                farms: farms,
                sensors: sensors,
                machines: machines,
            });
        } catch (error) {
            next(error);
        }
    }
    
    // lấy rule dựa vào id của owner
    async getByOwner(req, res, next) {
        try {
            const ownerID = req.params.owner_id || req.query.owner_id

            if (!ownerID) {
                const err = new Error("'owner_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const rules = await RuleService.getByOwner(ownerID)
            console.log('rules', rules)

            res.status(200).json(rules)
        } catch (error) {
            next(error)
        }
    }
    
    // lấy rule dựa vào id của machine
    async getByMachine(req, res, next) {
        try {
            const machineID = req.params.machine_id || req.query.machine_id

            if (!machineID) {
                const err = new Error("'machine_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const machines = await RuleService.getByOwner(machineID)

            res.status(200).json(machines)
        } catch (error) {
            next(error)
        }
    }

    // Tạo rule mới
    async createRule(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào rule
            const {
                farm,
                name,
                owner,
                sensor,
                sensorValue,
                start_at,
                end_at,
                duration,
                state,
                expr,
                target,
                machine
            } = req.body;

            // Nhận giá trị trả về từ hàm khởi tạo
            const ruleInserted = await RuleService.createRule({
                name,
                located: farm,
                owner,
                sensor,
                threshold: sensorValue,
                start_at,
                end_at,
                duration,
                state,
                expr,
                target_value: target,
                machine
            });

            res.status(200).json({ ruleInserted });
        } catch (error) {
            next(error);
        }
    }

    // // Cập nhật tài khoản khoản
    async updateRule(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào database
            
            const {
                _id,
                owner,
                farm,
                name,
                sensor,
                sensorValue,
                start_at,
                end_at,
                duration,
                state,
                expr,
                target,
                machine
            } = req.body;

            const ruleUpdated = await RuleService.updateRule({
                _id,
                name,
                owner,
                located: farm,
                sensor,
                threshold: sensorValue,
                start_at,
                end_at,
                duration,
                state,
                expr,
                target_value: target,
                machine
            })

            res.status(200).json(ruleUpdated)
        } catch (error) {
            next(error)
        }
    }

    // Xoá dữ liệu
    async deleteRule(req, res, next) {
        try {
            const _id = req.params._id || req.query._id

            if (!_id) {
                const err = new Error("'_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const rules = await RuleService.deleteRule(_id)

            res.status(200).json(rules)
        } catch (error) {

        }
    }

    // Cập nhật trạng thái điều kiện
    async setState(req, res, next) {
        try {
            const { _id, state } = req.body
            res.status(200).json(await RuleService.setState(_id, state)) 
        } catch (error) {

        }
    }
}

module.exports = new RuleController();
