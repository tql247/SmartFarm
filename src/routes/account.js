const express = require('express')
const Middleware = require('../utils/Middleware')
const account = express.Router()
const AccountController = require('../controllers/AccountController')

account.get('/all', AccountController.getAll)
account.get('/detail', AccountController.getAll)

account.get('/get_by_id', AccountController.getByID)
account.get('/get_by_id/:_id', AccountController.getByID)

account.post('/create', AccountController.createAccount)
account.post('/update', AccountController.updateAccount)

account.get('/delete', AccountController.deleteAccount)
account.get('/delete/:_id', AccountController.deleteAccount)

account.get('/login', AccountController.login)
account.post('/login', AccountController.postLogin)

module.exports = account