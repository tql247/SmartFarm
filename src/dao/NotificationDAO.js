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
            .exec()
    }

    async createNotification(machine) {
        return await NotificationModel
            .create({
                subject: machine.subject,
                detail: machine.detail,
                owner: machine.owner,
            })
    }
}

module.exports = new NotificationDao()