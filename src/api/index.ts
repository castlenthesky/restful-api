import * as express from 'express';

function router() {
  const mainRouter = express.Router();

  mainRouter.use('/',    require('./appRouter')());
  mainRouter.use('/api', require('./apiRouter')());

  return mainRouter;
}

module.exports = router;

