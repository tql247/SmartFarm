const express = require('express');
const { fileUpload } = require('../utils/Middleware');
const account = express.Router();
const AccountController = require('../_controllers/AccountController');

account.get('/test', AccountController.test);
account.post('/create', fileUpload.single('avatar'), AccountController.createAccount);
account.get('/all', AccountController.getAll);

module.exports = account;