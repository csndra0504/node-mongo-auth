import express from 'express';
import User from  '../models/user';

const router =  express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/profile', function (req, res, next) {
  return res.send('GET profile');
});

router.post('/', (req, res, next) => {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    const err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords don't match");
    return next(err);
  }

  // create user if all registration fields provided
  // otherwise return error
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/profile');
      }
    });

  }  else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }

});

router.post('/profile', function (req, res, next) {
  return res.send('POST profile');
});

module.exports = router;
