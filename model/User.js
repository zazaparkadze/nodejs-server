const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "username": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "roles": {
        type: [Number],
        default: [2001]
    },
    "refreshToken": String
});

module.exports = mongoose.model('User', userSchema);

