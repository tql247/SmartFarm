const Extension = require("../utils/Extension")
const RuleService = require("../services/RuleService")
const MachineService = require("../services/MachineService")
const SensorService = require("../services/SensorService")
const FarmService = require("../services/FarmService")
const AccountService = require("../services/AccountService")

class RuleController {
    async test(req, res, next) {
        try {
            res.status(201).json(await RuleService.test())
        } catch (error) {
            next(error)
        }
    }

    // lấy tẩt cả rule
    async getAll(req, res, next) {
        try {

            const accounts = await AccountService.getAll()
            let farms = []
            let sensors = []
            let machines = []

            const [sampleSelect] = accounts
            if (sampleSelect) {
                farms = await FarmService.getByOwner(sampleSelect._id)
                sensors = await SensorService.getByOwner(sampleSelect._id)
                machines = await MachineService.getByOwner(sampleSelect._id)
            }

            return res.render('_layout', { page: 'rule', accounts: accounts, farms: farms, sensors: sensors, machines: machines })
        } catch (error) {
            next(error)
        }
    }
    // Tạo rule mới
    async createRule(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào rule
            const rule = {
                name: req.body.name,
                sensor: req.body.sensor,
                machine: req.body.machine,
                time: req.body.time,
                threshold: req.body.threshold
            }

            // Nhận giá trị trả về từ hàm khởi tạo
            const ruleInserted = await RuleService.createRule(rule)

            res.status(200).json(ruleInserted) 
        } catch (error) {
            next(error)
        }
    }

    // // Cập nhật tài khoản khoản
    // async updateRule(req, res, next) {
    //     try {
    //         // Chuẩn bị dữ liệu để thêm vào database
    //         const rule = {
    //             email: req.body.email,
    //             password: await hashPassword(req.body.password),
    //             avatar: req["file"].filename,
    //             full_name: req.body.full_name,
    //             phone: req.body.phone,
    //             address: req.body.address,
    //             role: req.body.role,
    //             _id: req.body._id
    //         }

    //         const ruleInserted = await RuleService.updateRule(rule)

    //         res.status(200).json(ruleInserted) 
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    // // Lấy dữ liệu của toàn bộ rule có trong database
    // async getAll(req, res, next) {
    //     try {
    //         const rules = await RuleService.getAll()

    //         res.status(200).json(rules) 
    //     } catch (error) {

    //     }
    // }

    // // Xoá dữ liệu
    // async delete(req, res, next) {
    //     try {
    //         const _id = req.params._id || req.query._id

    //         if (!_id) {
    //             const err = new Error("'_id' was not provided!")
    //             err.name = "Bad request"
    //             next(err)
    //         }

    //         const rules = await RuleService.delete(_id)

    //         res.status(200).json(rules) 
    //     } catch (error) {

    //     }
    // }
}

module.exports = new RuleController()