import * as express from 'express';

function router() {
  const router = express.Router();

  router.route('/')
    .get((req, res) => {
      // Get logic
      return res.send('Welcome to the posts API.');
    })

  return router;
}

module.exports = router;
