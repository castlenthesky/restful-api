import * as express from 'express';
import * as mongoose from 'mongoose';

function appRouter() {
  const appRouter = express.Router();
  
  appRouter.route('/')
    .get((req, res) => {
      res.send('Welcome to the application.')
    });

  return appRouter;
}

module.exports = appRouter;
