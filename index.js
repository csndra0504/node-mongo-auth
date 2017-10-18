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
import ConnectMongo from 'connect-mongo';
import session from 'express-session';
import logger from 'morgan';
const MongoStore = ConnectMongo(session);
const app = express();

//connect to MongoDB
mongoose.connect('mongodb://localhost/testForAuth');
const db = mongoose.connection;

// middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware to parse incoming requests
app.use(logger('dev'));

// serve static files from template
app.use(express.static(__dirname + '/static'));

//use sessions for tracking logins
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// mount routes middleware to '/' path
app.use('/', routes);

app.listen(3000, function () {
  console.log('Listening on port 3000!')
});



//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!')
});
