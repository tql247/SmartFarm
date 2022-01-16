const express = require('express')
const sensor = express.Router()
const SensorController = require('../controllers/SensorController')

sensor.get('/all', SensorController.getAll)
sensor.get('/get_by_owner', SensorController.getByOwner)
sensor.get('/get_by_owner/:owner_id', SensorController.getByOwner)

sensor.get('/get_value', SensorController.getValue)
sensor.get('/get_value/:sensor_id', SensorController.getValue)

sensor.post('/create', SensorController.createSensor)
sensor.post('/update', SensorController.updateSensor)

sensor.get('/delete', SensorController.deleteSensor)
sensor.get('/delete/:_id', SensorController.deleteSensor)

module.exports = sensor