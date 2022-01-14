const express = require('express')
const machine = express.Router()
const MachineController = require('../controllers/MachineController')

machine.get('/all', MachineController.getAll)
machine.get('/get_by_owner', MachineController.getByOwner)
machine.get('/get_by_owner/:owner_id', MachineController.getByOwner)

machine.post('/create', MachineController.createMachine)
machine.post('/update', MachineController.updateMachine)

machine.get('/delete', MachineController.deleteMachine)
machine.get('/delete/:_id', MachineController.deleteMachine)

module.exports = machine