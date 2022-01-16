const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
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
    sensor: {
        type: Schema.Types.ObjectId,
        ref: 'Sensor',
        localField: 'sensor',
        foreignField: '_id',
        justOne: true
    },
    threshold: {
        type: Number,
    },
    expr: {
        type: String,
        description: 'True is >=, <= is false',
    }, 
    machine: {
        type: Schema.Types.ObjectId,
        ref: 'Machine',
        localField: 'machine',
        foreignField: '_id',
        justOne: true
    },
    target_value: {
        type: String,
    },
    start_at: {
        type: String,
    },
    end_at: {
        type: String,
    },
    // reset targetValue after
    duration: {
        type: Number,
        default: 60*1
    },
    // state of rule, set to False after run
    state: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date
    }
});

const RuleModel = mongoose.model('Rule', RuleSchema, 'rule');

module.exports = RuleModel
