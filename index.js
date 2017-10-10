import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes/router';

const app = express();

// middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(express.static(__dirname + '/static'));

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
