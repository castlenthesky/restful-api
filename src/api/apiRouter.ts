import * as express from 'express';
import * as mongoose from 'mongoose';

function apiRouter() {
  const apiRouter = express.Router();

  apiRouter.route('/')
    .get((req, res) => {
      // Get logic
      return res.send('Welcome to the API.');
    })
    .post((req, res) => {
      // Post logic.
      return res.send('POST logic pending.')
    })
    .put((req, res) => {
      // Put logic.
      return res.send('PUT logic pending.')
    })
    .patch((req, res) => {
      // Patch logic.
      return res.send('PATCH logic pending.')
    })
    .delete((req, res) => {
      // Delete logic.
      return res.send('DELETE logic pending.')
    });

    apiRouter.use('/users', require('../users/usersRouter')());
    apiRouter.use('/posts', require('./postRouter')());
    apiRouter.use('/tasks', require('./taskRouter')());

  return apiRouter;
}

module.exports = apiRouter;
