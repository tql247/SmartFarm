const mongoose = require('mongoose');

// dùng để tạo kết nối đến database
async function connect() {
    // const mongoDB = 'mongodb+srv://localhost:Guxy5rnRwXD6IQEZ@unisoc01.mhdcv.mongodb.net/uni_entities?retryWrites=true&w=majority';
    const mongoDB = 'mongodb+srv://tql247:86R!X538Umw9LZG@smartframe0.ywc8c.mongodb.net/entities?retryWrites=true&w=majority';

    await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    const db = mongoose.connection;
    
    db.on('error', (err) => {
        throw err
    });
}

module.exports = connect