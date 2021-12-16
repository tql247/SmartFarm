const express = require('express');
const Middleware = require('../utils/Middleware');
const account = express.Router();
const AccountController = require('../controllers/AccountController');

account.get('/test', AccountController.test);
account.get('/all', AccountController.getAll);
account.get('/detail', AccountController.getAll);
account.post('/create', Middleware.fileUpload.single('avatar'), AccountController.createAccount);
account.post('/update', Middleware.fileUpload.single('avatar'), AccountController.updateAccount);
account.get('/delete', AccountController.delete);
account.get('/delete/:_id', AccountController.delete);

module.exports = account;