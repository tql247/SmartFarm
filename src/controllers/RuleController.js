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
            console.log(rules);
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
    // Tạo rule mới
    async createRule(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào rule
            const {
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
            console.log(req.body)
            // console.log(typeof req.body.state)

            // Nhận giá trị trả về từ hàm khởi tạo
            const ruleInserted = await RuleService.createRule({
                name,
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

            console.log(req.body)

            const ruleUpdated = await RuleService.updateRule({
                _id,
                name,
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
            })

            res.status(200).json(ruleUpdated)
        } catch (error) {
            next(error)
        }
    }

    // // Lấy dữ liệu của toàn bộ rule có trong database
    // async getAll(req, res, next) {
    //     try {
    //         const rules = await RuleService.getAll()

    //         res.status(200).json(rules)
    //     } catch (error) {

    //     }
    // }

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
}

module.exports = new RuleController();
