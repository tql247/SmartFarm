const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    time: {
        "from": Date,
        "to": Date,
    },
    sensor: {
        type: Schema.Types.ObjectId,
        ref: 'Rule',
        localField: 'sensor',
        foreignField: '_id',
        justOne: true
    },
    threshold: {
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
    }
});

const RuleModel = mongoose.model('Rule', RuleSchema, 'rule');

module.exports = RuleModel
