const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SensorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    unit: {
        type: String,
        required: [true, 'Why no unit?']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        localField: 'owner',
        foreignField: '_id',
        justOne: true
    },
    located: {
        type: Schema.Types.ObjectId,
        ref: 'Farm',
        localField: 'located',
        foreignField: '_id',
        justOne: true
    },
    deleted_at: {
        type: Date
    }
})

const SensorModel = mongoose.model('Sensor', SensorSchema, 'sensor')

module.exports = SensorModel
