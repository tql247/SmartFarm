const express = require('express')
const Middleware = require('../utils/Middleware')
const account = express.Router()
const AccountController = require('../controllers/AccountController')

account.get('/test', AccountController.test)
account.get('/all', AccountController.getAll)
account.get('/detail', AccountController.getAll)
account.post('/create', AccountController.createAccount)
account.post('/update', AccountController.updateAccount)
account.get('/delete', AccountController.deleteAccount)
account.get('/delete/:_id', AccountController.deleteAccount)
account.get('/login', AccountController.login)

module.exports = account