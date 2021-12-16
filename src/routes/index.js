// Định nghĩa các route
const express = require('express');
const router = express.Router();
const account = require('./account');

router.get('/test', (req, res)=>{
    // io.emit('outside');
    res.send('hm')
})


router.use('/account', account);

module.exports = router;