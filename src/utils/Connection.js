const mongoose = require('mongoose')

class Connection {
    // dùng để tạo kết nối đến database
    async connect() {
        // Set đặt tính async await cho mongoose
        mongoose.Promise = global.Promise
        
        // const mongoDB = 'mongodb+srv://localhost:Guxy5rnRwXD6IQEZ@unisoc01.mhdcv.mongodb.net/uni_entities?retryWrites=true&w=majority'
        const mongoDB = 'mongodb+srv://tql247:86R!X538Umw9LZG@smartframe0.ywc8c.mongodb.net/entities?retryWrites=true&w=majority'

        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        const db = mongoose.connection

        db.on('error', (err) => {
            throw err
        })
    }

    async close() {
        // await mongoose.connection.close()
    }
}

module.exports = new Connection()
