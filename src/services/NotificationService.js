const NotificationDAO = require("../dao/NotificationDAO")
var mqtt = require('mqtt')
const Extension = require("../utils/Extension")


class NotificationService {
    async getByOwner(owner_id) {
        return await NotificationDAO.getByOwner(owner_id)
    }

    async createNotification(notification) {
        return await NotificationDAO.createNotification(notification)
    }
}

module.exports = new NotificationService()