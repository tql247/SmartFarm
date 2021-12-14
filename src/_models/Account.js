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
    full_name: {
        type: String,
        required: [true, 'Why no name?']
    },
    avatar: {
        data: Buffer,
        contentType: String
    },
    google_avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: [true, 'Why no role?']
    },
    token: {
        type: String,
    }
});

const AccountModel = mongoose.model('Account', AccountSchema, 'account');

module.exports = AccountModel
