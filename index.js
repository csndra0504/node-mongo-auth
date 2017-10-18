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

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
// app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

// mount routes middleware to '/' path
app.use('/', routes);

// Start the server
app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});



//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb!')
});
