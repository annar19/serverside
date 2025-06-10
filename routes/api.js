const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Cost = require('../models/costs');

/**
 * @route GET /costs
 * @description Get all cost entries from the database
 * @returns {Array} Array of all cost documents
 */
router.get('/costs',function(req,res,next){
    Cost.find({}).then(function(costs){
        res.send(costs);
    }).catch(next);
});

/**
 * @route POST /add
 * @description Add a new cost item to the database
 * @body {string} description - Description of the cost
 * @body {string} category - Category of the cost (food, health, housing, sport, education)
 * @body {string|number} userid - ID of the user who made the expense
 * @body {number} sum - Amount of the cost
 * @returns {Object} Newly created cost item or validation error
 */
router.post('/add', function(req, res, next) {
    // Validate required fields first
    const requiredFields = ['description', 'category', 'userid', 'sum'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Missing Required Fields",
            message: `The following fields are required: ${missingFields.join(', ')}`
        });
    }

    const validCategories = ['food', 'health', 'housing', 'sport', 'education'];
    if (!validCategories.includes(req.body.category)) {
        return res.status(400).json({
            error: "Invalid Category",
            message: `Category must be one of: ${validCategories.join(', ')}`
        });
    }

    if (typeof req.body.sum !== 'number' && isNaN(Number(req.body.sum))) {
        return res.status(400).json({
            error: "Invalid Sum",
            message: "Sum must be a number"
        });
    }

    Cost.create(req.body).then(function(cost) {
        res.send(cost);
    }).catch(error => {
        res.status(400).json({
            error: "Validation Error",
            message: error.message
        });
    });
});

/**
 * @route GET /report
 * @description Get cost report for a specific user, year, and month
 * @query {string} id - User ID
 * @query {number} year - Year of the report
 * @query {number} month - Month of the report (1-12)
 * @returns {Object} Report grouped by category with total expenses
 */
router.get('/report', async function(req, res) {
    try {
        const { id, year, month } = req.query;

        if (!id || !year || !month) {
            return res.status(400).json({
                error: "Missing parameters",
                message: "Please provide all required parameters: id, year, and month"
            });
        }

        const yearNum = parseInt(year);
        const monthNum = parseInt(month);

        if (isNaN(yearNum) || yearNum < 1900 || yearNum > 9999) {
            return res.status(400).json({
                error: "Invalid year",
                message: "Year must be a valid number between 1900 and 9999"
            });
        }

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            return res.status(400).json({
                error: "Invalid month",
                message: "Month must be a number between 1 and 12"
            });
        }

        const user = await User.findOne({ id: id });
        if (!user) {
            return res.status(404).json({
                error: "User not found",
                message: `No user found with id ${id}`
            });
        }

        const costs = await Cost.find({
            userid: id,
            date: {
                $gte: new Date(yearNum, monthNum - 1, 1),
                $lt: new Date(yearNum, monthNum, 1)
            }
        });

        const categories = ['food', 'health', 'housing', 'sport', 'education'];
        const groupedCosts = categories.map(category => ({
            [category]: []
        }));

        if (costs && costs.length > 0) {
            costs.forEach(cost => {
                const categoryIndex = categories.indexOf(cost.category);
                if (categoryIndex !== -1) {
                    groupedCosts[categoryIndex][cost.category].push({
                        sum: cost.sum,
                        description: cost.description,
                        day: new Date(cost.date).getDate()
                    });
                }
            });
        }

        const report = {
            userid: id,
            year: yearNum,
            month: monthNum,
            costs: groupedCosts
        };

        res.json(report);

    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            message: "An unexpected error occurred while processing your request"
        });
    }
});

/**
 * @route GET /users/:id
 * @description Get specific user details along with their total costs
 * @param {string} id - User ID parameter in URL
 * @returns {Object} User details including first name, last name, and total costs
 * @throws {404} If user is not found
 * @throws {500} If server error occurs
 */
router.get('/users/:id', async function(req, res) {
    try {
        const userId = req.params.id;

        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
                message: `No user found with id ${userId}`
            });
        }

        const costs = await Cost.find({ userid: userId });

        const total = costs.reduce((sum, cost) => sum + cost.sum, 0);

        const response = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total: total
        };

        res.json(response);

    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            message: "An error occurred while retrieving user details"
        });
    }
});

/**
 * @route GET /about
 * @description Get information about the development team members
 * @returns {Array} Array of team members with their first and last names
 */
router.get('/about', function(req, res) {
    const teamMembers = [
        {
            "first_name": "Anna",
            "last_name": "Ryvkov"
        },
        {
            "first_name": "Dor",
            "last_name": "Hakmon"
        }
    ];
    res.json(teamMembers);
});



module.exports = router;