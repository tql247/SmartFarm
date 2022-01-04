// Định nghĩa các route
const express = require('express')
const router = express.Router()
const rule = require('./rule')
const account = require('./account')
const farm = require('./farm')

router.get('/test', (req, res)=>{
    // io.emit('outside')
    res.send('hm')
})

router.use('/account', account)
router.use('/rule', rule)
router.use('/farm', farm)

module.exports = router