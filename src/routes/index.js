// Định nghĩa các route
const express = require('express')
const router = express.Router()
const rule = require('./rule')
const account = require('./account')

router.get('/test', (req, res)=>{
    // io.emit('outside')
    res.send('hm')
})

router.use('/account', account)
router.use('/rule', rule)

module.exports = router