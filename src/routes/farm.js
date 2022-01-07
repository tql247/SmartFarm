const express = require('express')
const account = express.Router()
const FarmController = require('../controllers/FarmController')

account.get('/test', FarmController.test)
account.get('/all', FarmController.getAll)
// account.get('/detail', FarmController.getAll)
account.post('/create', FarmController.createFarm)
account.post('/update', FarmController.updateFarm)
// account.get('/delete', FarmController.deleteFarm)
// account.get('/delete/:_id', FarmController.deleteFarm)
// account.get('/login', FarmController.login)

module.exports = account