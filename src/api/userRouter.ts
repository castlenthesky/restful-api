import * as express from 'express';
import * as mongoose from 'mongoose';

function router() {
  const router = express.Router();
  const User = require('../models/userModel');

  router.route('/')
    .get((req, res) => {
      // Get logic
      const { query } = req;
      User.find(query, (err, users) => {
        if (err) {
          return res.send(err);
        }
        const returnUsers = users.map((user) => {
          const newUser = user.toJSON();
          newUser.links = {};
          newUser.links.allUsers = `http://${req.headers.host}/api/users/`;
          newUser.links.self = `http://${req.headers.host}/api/users/${user._id}`;
          newUser.links.role = `http://${req.headers.host}/api/users?role=${user.role}`
          return newUser;
        })
        return res.json(returnUsers);
      });
    })
    .post((req, res) => {
      // POST logic
      const user = new User(req.body);
      user.save();
      return res.status(201).json(user);
    });
  
  router.use('/:userID', (req, res, next) => {
    // User Middleware
    User.findById(req.params.userID, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
        return next()
      }
      return res.sendStatus(404);
    })
  });
  
  router.route('/:userID')
    .get((req, res) => {
      const returnUser = req.user.toJSON();
      returnUser.links = {};
      returnUser.links.allUsers = `http://${req.headers.host}/api/users/`
      returnUser.links.self = `http://${req.headers.host}/api/users/${user._id}`
      res.json(req.user)
    })
    .put((req, res) => {
      const { user } = req;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.title = req.body.title;
      user.role = req.body.role;
      user.email = req.body.email;
      req.user.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    .patch((req, res) => {
      const { user } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        user[key] = value;
      });
      req.user.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    .delete((req, res) => {
      req.user.remove((err) => {
        if(err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      })
    });

  return router;
}

module.exports = router;
