const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        localField: 'owner',
        foreignField: '_id',
        justOne: true
    },
    subject: {
        type: String,
        required: [true, 'Why no subject?']
    },
    detail: {
        type: String,
        required: [true, 'Why no detail?']
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    deleted_at: {
        type: Date
    }
})

const NotificationModel = mongoose.model('Notification', NotificationSchema, 'notification')

module.exports = NotificationModel
