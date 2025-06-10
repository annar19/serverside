/**
 * @module models/users
 * @requires mongoose
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Schema
 * @typedef {Object} UserSchema
 * @property {string} id - Unique identifier for the user
 * @property {string} first_name - User's first name
 * @property {string} last_name - User's last name
 * @property {Date} birthday - User's date of birth
 */
const UserSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    }
});

/**
 * User Model
 * @typedef {mongoose.Model<UserSchema>} UserModel
 */
const User = mongoose.model('user', UserSchema);

module.exports = User;