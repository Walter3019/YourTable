const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./configuration');

// MongoDB
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.MONGODB_URI,  { useNewUrlParser: true } );

const app = express();
app.use(cors());

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;
