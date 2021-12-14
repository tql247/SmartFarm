const express = require('express');
const router = express.Router();
const AccountController = require('../_controllers/AccountController');

router.get('/test', AccountController.test)

module.exports = router;