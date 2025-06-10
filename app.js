/**
 * @module app
 * @requires express
 * @requires mongoose
 * @requires path
 * @requires cookie-parser
 * @requires morgan
 * @requires http-errors
 */

const createError = require('http-errors');
const mongoose = require('mongoose');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

const app = express();

/**
 * @description Configure JSON response formatting with 2 spaces indentation
 */
app.set('json spaces', 2);

/**
 * @description Establish MongoDB connection
 * @type {Promise<void>}
 */
mongoose.connect('mongodb+srv://root:root1234@cluster0.ec87gn6.mongodb.net/ProjectData');

/**
 * @description Configure view engine settings
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * @description Configure application middleware
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @description Configure route handlers
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

/**
 * @description Handle 404 errors - route not found
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * @description Global error handler
 * @param {Error} err - Error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
