const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const routes = require('./src/routes');
const config = require('./src/config');
const {
  handleError
} = require('./src/helpers/error');
const {
  createDbString
} = require('./src/helpers/utility');

// App initialization
const app = express();
app.use(cors());
app.disable('x-powered-by');

// Configurations
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('🔥🔥🔥🔥Welcome to BackEnd🔥🔥🔥🔥');
});


// Routes
app.use('/', routes);

// Error Handler
app.use((err, req, res, next) => {
  if (err.statusCode) handleError(err, res);
  else {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
    });
  }
});

const PORT = config.APP_PORT || 8000;

const HOST = config.APP_HOST || '0.0.0.0';

// Starting server
app.listen(PORT, HOST, () => {
  console.log(`Listening 👂 on  ${HOST}:${PORT}`);
});

const dbURL = createDbString(config.MONGO_DB, parseInt(config.MONGO_AUTH, 10));
console.log(dbURL);
mongoose.connect(dbURL, {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open to serve');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection has occured ${err} error`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

// Exception Handling
process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception thrown, error:${err}`);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection thrown, error:${err}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection is disconnected due to application termination');
    process.exit(0);
  });
});

module.exports = app;