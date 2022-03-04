const mongoose = require('mongoose')
const NotificationModel = require('../models/NotificationModel')
// const Connection = require("../utils/_Connection")

class NotificationDao {
    async getByOwner(owner_id) {
        return await NotificationModel
            .find({
                deleted_at: null,
                owner: owner_id
            })
            .populate('owner', "full_name email")
            .sort( { created_at: -1 } )
            .exec()
    }

    async createNotification(notification) {
        return await NotificationModel
            .create({
                subject: notification.subject,
                detail: notification.detail,
                owner: notification.owner,
            })
    }
}

module.exports = new NotificationDao()