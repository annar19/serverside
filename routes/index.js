/**
 * @module routes/index
 * @requires express
 */

const express = require('express');
const router = express.Router();

/**
 * @route GET /
 * @description Renders the index page of the application
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 * @returns {void} Renders the index view with title
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
