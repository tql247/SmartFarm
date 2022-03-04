// Gọi các route đã định nghĩa
const express = require('express')
const router = express.Router()
const rule = require('./rule')
const account = require('./account')
const farm = require('./farm')
const sensor = require('./sensor')
const machine = require('./machine')
const notification = require('./notification')
const dashboard = require('./dashboard')

router.get('/', (req, res)=>{ res.redirect('/dashboard') })

router.use('/account', account)
router.use('/rule', rule)
router.use('/farm', farm)
router.use('/sensor', sensor)
router.use('/machine', machine)
router.use('/notification', notification)
router.use('/dashboard', dashboard)

module.exports = router