import express from 'express';
import User from  '../models/user';
import auth from './auth.js';

const router =  express.Router();

/*
 * Routes that can be accessed by any one
 */
// router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
// router.get('/api/v1/admin/users', user.getAll);
// router.get('/api/v1/admin/user/:id', user.getOne);
// router.post('/api/v1/admin/user/', user.create);
// router.put('/api/v1/admin/user/:id', user.update);
// router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
