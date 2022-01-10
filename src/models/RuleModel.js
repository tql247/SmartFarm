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
    threshold: {
        type: Number,
    },
    expr: {
        type: Boolean,
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
        type: Number,
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
});

const RuleModel = mongoose.model('Rule', RuleSchema, 'rule');

module.exports = RuleModel
