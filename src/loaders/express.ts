// loaders methodology was modeled after https://github.com/dev-mastery/comments-api
// It moves the configuration of the Express application into an importable module.
import * as express from 'express'
import * as bodyParser from 'body-parser';
import * as path from 'path'
import * as favicon from 'serve-favicon'
import router from '../routes'

// Export a default function which takes an Express app as its only argument
// this function takes the Express app it receives, configures it, and returns it.
export default async({ app }: { app: express.Application}) => {
  app.use(require('morgan')('tiny')) // Enable morgan for request logging
  // Configure Express to use the body-parser middleware
  app.use(bodyParser.urlencoded({ extended: false })) 
  app.use(bodyParser.json());
  app.enable('trust proxy');
  app.use(favicon(path.join(__dirname, '../', 'public', 'images', 'favicon.ico')));

  // Configure application permissions
  // app.use(cors()); // cors may be redundant to this code below
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
  });

  // Establish endpoints to check the status of the server.
  app.head('/status', (req, res) => { return res.status(200).end(); });
  app.get('/status',  (req, res) => { return res.status(200).end(); });
  
  // Import an index router to define the rest of the application's routes.
  app.use('/', router())

  return app;
}
