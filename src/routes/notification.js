const express = require('express')
const notification = express.Router()
const NotificationController = require('../controllers/NotificationController')

notification.get('/get_by_owner', NotificationController.getByOwner)
notification.get('/get_by_owner/:owner_id', NotificationController.getByOwner)

notification.post('/create', NotificationController.createNotification)

module.exports = notification