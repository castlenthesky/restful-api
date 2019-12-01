import * as express from 'express';

function router() {
  const router = express.Router();

  router.use('/users', require('../users/usersRouter')());
  router.use('/posts', require('./postRouter')());
  router.use('/tasks', require('./taskRouter')());


  return router;
}

module.exports = router;
