// Gọi các route đã định nghĩa
const express = require('express')
const router = express.Router()
const rule = require('./rule')
const account = require('./account')
const farm = require('./farm')
const sensor = require('./sensor')

router.get('/test', (req, res)=>{
    // io.emit('outside')
    res.send('hm')
})

router.use('/account', account)
router.use('/rule', rule)
router.use('/farm', farm)
router.use('/sensor', sensor)

module.exports = router