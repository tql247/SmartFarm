const express = require('express')
const farm = express.Router()
const FarmController = require('../controllers/FarmController')

farm.get('/test', FarmController.test)
farm.get('/all', FarmController.getAll)

farm.post('/create', FarmController.createFarm)
farm.post('/update', FarmController.updateFarm)

farm.get('/delete', FarmController.deleteFarm)
farm.get('/delete/:_id', FarmController.deleteFarm)

module.exports = farm