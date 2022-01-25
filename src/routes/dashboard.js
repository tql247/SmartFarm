const express = require('express')
const Middleware = require('../utils/Middleware')
const dashboard = express.Router()
const DashboardController = require('../controllers/DashboardController.js')

dashboard.get('/', DashboardController.get)

module.exports = dashboard