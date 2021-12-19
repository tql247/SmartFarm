const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    time: {
        "from": String,
        "to": String,
    },
    sensor: {
        type: Schema.Types.ObjectId,
        ref: 'Rule',
        localField: 'sensor',
        foreignField: '_id',
        justOne: true
    },
    thresholdUp: {
        type: Number,
    },
    thresholdDown: {
        type: Number,
    },
    machine: {
        type: Schema.Types.ObjectId,
        ref: 'Machine',
        localField: 'machine',
        foreignField: '_id',
        justOne: true
    },
    targetValue: {
        type: Number,
    },
    // reset targetValue after
    duration: {
        type: Number,
        default: 60*1
    },
    // state of rule, set to False after run
});

const RuleModel = mongoose.model('Rule', RuleSchema, 'rule');

module.exports = RuleModel
