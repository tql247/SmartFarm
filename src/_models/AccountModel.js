const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Why no username?'],
        unique: [true, 'This email is exist']
    },
    password: {
        type: String,
        required: [true, 'Why no password?']
    },
    avatar: {
        data: Buffer,
        contentType: String
    },
    full_name: {
        type: String,
        required: [true, 'Why no name?']
    },
    phone: {
        type: String,
        required: [true, 'Why no phone?']
    },
    address: {
        type: String,
        required: [true, 'Why no address?']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: [true, 'Why no role?']
    }
});

const AccountModel = mongoose.model('Account', AccountSchema, 'account');

module.exports = AccountModel
