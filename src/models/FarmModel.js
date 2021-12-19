const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FarmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    address: {
        type: String,
        required: [true, 'Why no address?']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        localField: 'owner',
        foreignField: '_id',
        justOne: true
    },
})

const FarmModel = mongoose.model('Farm', FarmSchema, 'farm')

module.exports = FarmModel
