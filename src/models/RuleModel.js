const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    sensor: {
        type: Schema.Types.ObjectId,
        ref: 'Rule',
        localField: 'sensor',
        foreignField: '_id',
        justOne: true
    },
    machine: {
        type: Schema.Types.ObjectId,
        ref: 'Machine',
        localField: 'machine',
        foreignField: '_id',
        justOne: true
    },
    time: {
        "from": Date,
        "to": Date,
    },
    threshold: String
});

const RuleModel = mongoose.model('Rule', RuleSchema, 'rule');

module.exports = RuleModel
