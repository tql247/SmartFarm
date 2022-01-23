const Extension = require("../utils/Extension")
const NotificationService = require("../services/NotificationService")
const FarmService = require("../services/FarmService")
const AccountService = require("../services/AccountService")

class NotificationController {
    // lấy thông báo dựa vào id của owner
    async getByOwner(req, res, next) {
        try {
            const ownerID = req.params.owner_id || req.query.owner_id

            if (!ownerID) {
                const err = new Error("'owner_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const notifications = await NotificationService.getByOwner(ownerID)

            res.status(200).json(notifications)
        } catch (error) {
            next(error)
        }
    }

    // Tạo notification mới
    async createNotification(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào notification
            const notification = {
                subject: req.body.subject,
                detail: req.body.detail,
                owner: req.body.owner,
            }

            // Nhận giá trị trả về từ hàm khởi tạo
            const notificationInserted = await NotificationService.createNotification(notification)

            res.status(200).json(notificationInserted)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new NotificationController()