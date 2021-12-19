const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MachineSchema = new Schema({
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
    subcribeMQTT: {
        type: String,
    }
})

const MachineModel = mongoose.model('Machine', MachineSchema, 'machine')

module.exports = MachineModel
