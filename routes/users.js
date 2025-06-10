/**
 * @module routes/users
 * @requires express
 */

const express = require('express');
const router = express.Router();

/**
 * @route GET /users/
 * @description Get users listing endpoint
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 * @returns {void} Sends a response with a resource message
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
