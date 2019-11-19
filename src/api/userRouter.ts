import * as express from 'express';
import * as mongoose from 'mongoose';

function router() {
  const router = express.Router();
  const User = require('../models/userModel');

  router.route('/')
    .get((req, res) => {
      const { query } = req;

      // Get logic
      User.find(query, (err, users) => {
        if (err) {
          return res.send(err);
        }
        return res.json(users);
      });
    })
    .post((req, res) => {
      const user = new User(req.body);
      user.save();
      return res.status(201).json(user);
    });
  
  router.route('/:userID')
    .get((req, res) => {
      const { query } = req;

      // Get logic
      User.findById(req.params.userID, (err, user) => {
        if (err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    .put((req, res) => {
      User.findById(req.params.userID, (err, user) => {
        if (err) {
          return res.send(err);
        }
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.title = req.body.title;
        user.role = req.body.role;
        user.email = req.body.email;

        return res.json(user);
      });
    });

  return router;
}

module.exports = router;
