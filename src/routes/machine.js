const express = require('express')
const machine = express.Router()
const MachineController = require('../controllers/MachineController')

machine.get('/all', MachineController.getAll)
machine.get('/get_by_owner', MachineController.getByOwner)
machine.get('/get_by_owner/:owner_id', MachineController.getByOwner)

machine.get('/get_value', MachineController.getValue)
machine.get('/get_value/:machine_id', MachineController.getValue)

machine.post('/create', MachineController.createMachine)
machine.post('/update', MachineController.updateMachine)

machine.get('/delete', MachineController.deleteMachine)
machine.get('/delete/:_id', MachineController.deleteMachine)

machine.post('/set_state', MachineController.setState)

module.exports = machine