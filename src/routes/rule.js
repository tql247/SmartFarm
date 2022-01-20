const express = require('express')
const rule = express.Router()
const RuleController = require('../controllers/RuleController')

rule.get('/all', RuleController.getAll)

rule.get('/get_by_owner', RuleController.getByOwner)
rule.get('/get_by_owner/:owner_id', RuleController.getByOwner)

rule.get('/get_by_machine', RuleController.getNyMachine)
rule.get('/get_by_machine/:machine_id', RuleController.getNyMachine)

rule.post('/create', RuleController.createRule)
rule.post('/update', RuleController.updateRule)

rule.get('/delete', RuleController.deleteRule)
rule.get('/delete/:_id', RuleController.deleteRule)

rule.post('/set_state', RuleController.setState)

module.exports = rule