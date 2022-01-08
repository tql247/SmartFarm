const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MachineSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
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

const MachineModel = mongoose.model('Machine', MachineSchema, 'machine')

module.exports = MachineModel
