import * as express from 'express';
import adaptRequest from '../helpers/adapt-request'

function router() {
  const router = express.Router();

  router.use('*', requestAdaptor)

  router.use('/users', require('../users/usersRouter')());
  router.use('/posts', require('./postRouter')());
  router.use('/tasks', require('./taskRouter')());


  return router;
}

module.exports = router;


function requestAdaptor(req, res, next) {
  req = adaptRequest(req)
  return next()
}
