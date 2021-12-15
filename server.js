require('dotenv').config()
require('module-alias/register')
require('events').defaultMaxListeners = 100;
require('./socket')
require('./src/index')

console.log('Server is running...')
console.log(process.env.HOST + ':' + process.env.PORT)