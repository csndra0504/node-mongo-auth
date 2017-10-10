import express from 'express';
import User from  '../models/user';

const router =  express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
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
      passwordConf: req.body.passwordConf,
    };

    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      } else {
        res.send("user created!");
        console.log('success!');
      }
    });

  }  else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }

});

module.exports = router;
