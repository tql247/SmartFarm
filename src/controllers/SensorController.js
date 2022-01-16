const Extension = require("../utils/Extension")
const SensorService = require("../services/SensorService")
const FarmService = require("../services/FarmService")
const AccountService = require("../services/AccountService")

class SensorController {
    // lấy tẩt cả sensor
    async getAll(req, res, next) {
        try {
            const sensors = await SensorService.getAll()
            const accounts = await AccountService.getAll()
            let farms = []

            const [sampleSelect] = accounts
            if (sampleSelect) farms = await FarmService.getByOwner(sampleSelect._id)

            return res.render('_layout', { page: 'sensor', sensors: sensors, accounts: accounts, farms: farms })
        } catch (error) {
            next(error)
        }
    }
    

    // lấy sensor dựa vào id của owner
    async getByOwner(req, res, next) {
        try {
            const ownerID = req.params.owner_id || req.query.owner_id

            if (!ownerID) {
                const err = new Error("'owner_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const sensors = await SensorService.getByOwner(ownerID)

            res.status(200).json(sensors)
        } catch (error) {
            next(error)
        }
    }
    

    // lấy giá trị của sensor dựa vào id
    async getValue(req, res, next) {
        try {
            const sensorID = req.params.sensor_id || req.query.sensor_id

            if (!sensorID) {
                const err = new Error("'sensor_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const sensors = await SensorService.getValue(sensorID)

            res.status(200).json(sensors)
        } catch (error) {
            next(error)
        }
    }

    // Tạo sensor mới
    async createSensor(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào sensor
            const sensor = {
                name: req.body.name,
                located: req.body.farm,
                owner: req.body.owner,
            }

            // Nhận giá trị trả về từ hàm khởi tạo
            const sensorInserted = await SensorService.createSensor(sensor)

            res.status(200).json(sensorInserted)
        } catch (error) {
            next(error)
        }
    }

    // // Cập nhật tài khoản khoản
    async updateSensor(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào database
            const sensor = {
                name: req.body.name,
                located: req.body.farm,
                owner: req.body.owner,
                _id: req.body._id
            }

            // giá trị mới sau khi update
            const sensorUpdated = await SensorService.updateSensor(sensor)

            res.status(200).json(sensorUpdated) 
        } catch (error) {
            next(error)
        }
    }

    // // Lấy dữ liệu của toàn bộ sensor có trong database
    // async getAll(req, res, next) {
    //     try {
    //         const sensors = await SensorService.getAll()

    //         res.status(200).json(sensors) 
    //     } catch (error) {

    //     }
    // }

    // Xoá dữ liệu
    async deleteSensor(req, res, next) {
        try {
            const _id = req.params._id || req.query._id

            if (!_id) {
                const err = new Error("'_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const sensorDeleted = await SensorService.deleteSensor(_id)

            res.status(200).json(sensorDeleted) 
        } catch (error) {

        }
    }
}

module.exports = new SensorController()