const Extension = require("../utils/Extension")
const MachineService = require("../services/MachineService")
const FarmService = require("../services/FarmService")
const AccountService = require("../services/AccountService")

class MachineController {
    // lấy tẩt cả machine
    async getAll(req, res, next) {
        try {
            const machines = await MachineService.getAll()
            const accounts = await AccountService.getAll()
            let farms = []

            const [sampleSelect] = accounts
            if (sampleSelect) farms = await FarmService.getByOwner(sampleSelect._id)

            return res.render('_layout', { page: 'machine', machines: machines, accounts: accounts, farms: farms })
        } catch (error) {
            next(error)
        }
    }
    
    // lấy thiết bị dựa vào id của owner
    async getByOwner(req, res, next) {
        try {
            const ownerID = req.params.owner_id || req.query.owner_id

            if (!ownerID) {
                const err = new Error("'owner_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const machines = await MachineService.getByOwner(ownerID)

            res.status(200).json(machines)
        } catch (error) {
            next(error)
        }
    }

    // lấy giá trị của machine dựa vào id
    async getValue(req, res, next) {
        try {
            const machineID = req.params.machine_id || req.query.machine_id

            if (!machineID) {
                const err = new Error("'machine_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const machines = await MachineService.getValue(machineID)

            res.status(200).json(machines)
        } catch (error) {
            next(error)
        }
    }

    // Tạo machine mới
    async createMachine(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào machine
            const machine = {
                name: req.body.name,
                located: req.body.farm,
                owner: req.body.owner,
            }

            // Nhận giá trị trả về từ hàm khởi tạo
            const machineInserted = await MachineService.createMachine(machine)

            res.status(200).json(machineInserted)
        } catch (error) {
            next(error)
        }
    }

    // // Cập nhật tài khoản khoản
    async updateMachine(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào database
            const machine = {
                name: req.body.name,
                located: req.body.farm,
                owner: req.body.owner,
                _id: req.body._id
            }

            // giá trị mới sau khi update
            const machineUpdated = await MachineService.updateMachine(machine)

            res.status(200).json(machineUpdated) 
        } catch (error) {
            next(error)
        }
    }

    // Xoá dữ liệu
    async deleteMachine(req, res, next) {
        try {
            const _id = req.params._id || req.query._id

            if (!_id) {
                const err = new Error("'_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const machineDeleted = await MachineService.deleteMachine(_id)

            res.status(200).json(machineDeleted) 
        } catch (error) {

        }
    }

    // Cập nhật trạng thái thiết bị
    async setMachineState(req, res, next) {
        try {
            const { _id, state } = req.body
            res.status(200).json(await MachineService.setMachineState(_id, state)) 
        } catch (error) {

        }
    }
}

module.exports = new MachineController()