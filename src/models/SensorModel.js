const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SensorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    nameInDB: {
        type: String,
    },
    locate: {
        type: Schema.Types.ObjectId,
        ref: 'Farm',
        localField: 'locate',
        foreignField: '_id',
        justOne: true
    },
    topicMQTT: {
        type: String,
    }
})

const SensorModel = mongoose.model('Sensor', SensorSchema, 'sensor')

module.exports = SensorModel
