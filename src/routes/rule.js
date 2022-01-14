const express = require('express')
const rule = express.Router()
const RuleController = require('../controllers/RuleController')

rule.get('/all', RuleController.getAll)
rule.post('/create', RuleController.createRule)
rule.post('/update', RuleController.updateRule)
rule.get('/delete', RuleController.deleteRule)
rule.get('/delete/:_id', RuleController.deleteRule)

module.exports = rule