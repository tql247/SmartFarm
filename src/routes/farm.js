const express = require('express')
const farm = express.Router()
const FarmController = require('../controllers/FarmController')

farm.get('/all', FarmController.getAll)

farm.get('/get_by_owner', FarmController.getByOwner)
farm.get('/get_by_owner/:owner_id', FarmController.getByOwner)

farm.post('/create', FarmController.createFarm)
farm.post('/update', FarmController.updateFarm)

farm.get('/delete', FarmController.deleteFarm)
farm.get('/delete/:_id', FarmController.deleteFarm)

module.exports = farm