// Gọi các route đã định nghĩa
const express = require('express')
const router = express.Router()
const rule = require('./rule')
const account = require('./account')
const farm = require('./farm')
const sensor = require('./sensor')
const machine = require('./machine')
const notification = require('./notification')

router.get('/test', (req, res)=>{ res.send('test') })

router.use('/account', account)
router.use('/rule', rule)
router.use('/farm', farm)
router.use('/sensor', sensor)
router.use('/machine', machine)
router.use('/notification', notification)

module.exports = router