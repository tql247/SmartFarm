const Extension = require("../utils/Extension")
const FarmService = require("../services/FarmService")
const AccountService = require("../services/AccountService")

class FarmController {
    // lấy tẩt cả farm
    async getAll(req, res, next) {
        try {
            const farms = await FarmService.getAll()
            const accounts = await AccountService.getAll()

            return res.render('_layout', { page: 'farm', farms: farms, accounts: accounts })
        } catch (error) {
            next(error)
        }
    }

    // lấy farm dự vào id của owner
    async getByOwner(req, res, next) {
        try {
            const ownerID = req.params.owner_id || req.query.owner_id

            if (!ownerID) {
                const err = new Error("'owner_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const farms = await FarmService.getByOwner(ownerID)

            res.status(200).json(farms)
        } catch (error) {
            next(error)
        }
    }

    // Tạo farm mới
    async createFarm(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào farm
            const farm = {
                name: req.body.name,
                address: req.body.address,
                owner: req.body.owner,
            }

            // Nhận giá trị trả về từ hàm khởi tạo
            const farmInserted = await FarmService.createFarm(farm)

            res.status(200).json(farmInserted)
        } catch (error) {
            next(error)
        }
    }

    // // Cập nhật tài khoản khoản
    async updateFarm(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào database
            const farm = {
                name: req.body.name,
                address: req.body.address,
                owner: req.body.owner,
                _id: req.body._id
            }

            // giá trị mới sau khi update
            const farmUpdated = await FarmService.updateFarm(farm)

            res.status(200).json(farmUpdated)
        } catch (error) {
            next(error)
        }
    }

    // // Lấy dữ liệu của toàn bộ farm có trong database
    // async getAll(req, res, next) {
    //     try {
    //         const farms = await FarmService.getAll()

    //         res.status(200).json(farms) 
    //     } catch (error) {

    //     }
    // }

    // Xoá dữ liệu
    async deleteFarm(req, res, next) {
        try {
            const _id = req.params._id || req.query._id

            if (!_id) {
                const err = new Error("'_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            console.log("deleteFarm")
            console.log(_id)

            const farmDeleted = await FarmService.deleteFarm(_id)
            console.log("farmDeleted")
            console.log(farmDeleted)

            res.status(200).json(farmDeleted)
        } catch (error) {

        }
    }
}

module.exports = new FarmController()