const express = require('express')
const rule = express.Router()
const RuleController = require('../controllers/RuleController')

rule.get('/test', RuleController.test)
rule.get('/all', RuleController.getAll)
rule.post('/create', RuleController.createRule)

module.exports = rule