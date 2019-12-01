import * as express from 'express';
import * as mongoose from 'mongoose';
import { stat } from 'fs';
import * as db from '../loaders'
import adaptRequest from '../helpers/adapt-request'
import makeUsersEndpoints from '../users/usersController'
import usersList from './user-list'

const handle = makeUsersEndpoints(usersList)

function router() {
  const router = express.Router();

  router.all('/', userController)
  router.get('/:userID', userController)

  return router;
}

function userController(req, res) {
  const httpRequest = adaptRequest(req)
  handle(httpRequest)
    .then(({ headers, statusCode, data }) => {
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    })
}

module.exports = router;
