import config from './config';
import * as express from 'express'

async function startServer() {
  const app = express()
  await require('./loaders').default({ expressApp: app })

  app.listen(config.port, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }
    console.log(`Server listening on port: ${config.port}`)
  })
}

// Run the fuction that starts the server.
startServer()
