console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // Loads environment settings from '.env' into process.env
  // This is for local development
  require('dotenv').config();
}
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes/router';
var session = require('express-session');

const app = express();

// middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(express.static(__dirname + '/static'));

//use sessions for tracking logins
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

// mount routes middleware to '/' path
app.use('/', routes);

app.listen(3000, function () {
  console.log('Listening on port 3000!')
});

//connect to MongoDB
mongoose.connect('mongodb://localhost/testForAuth');
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!')
});
