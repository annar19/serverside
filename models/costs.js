/**
 * @module models/costs
 * @requires mongoose
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Cost Schema
 * @typedef {Object} CostSchema
 * @property {string} description - Description of the cost item
 * @property {('food'|'health'|'housing'|'sport'|'education')} category - Category of the cost
 * @property {string} userid - ID of the user who made the expense
 * @property {number} sum - Amount of the cost
 * @property {Date} date - Date when the cost was created (defaults to current date)
 */
const CostSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['food', 'health', 'housing', 'sport', 'education']
    },
    userid: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

/**
 * Cost Model
 * @typedef {mongoose.Model<CostSchema>} CostModel
 */
const Cost = mongoose.model('cost',CostSchema);

module.exports = Cost;