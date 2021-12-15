const express = require('express');
const uploader = require('../utils/uploader');
const account = express.Router();
const AccountController = require('../_controllers/AccountController');

account.get('/test', AccountController.test);
account.post('/create', uploader.single('avatar'), AccountController.createAccount);

module.exports = account;