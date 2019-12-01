import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

export default async ({ app }: { app: express.Application}) => {
  app.use(cors());
  app.use(require('morgan')('tiny'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.enable('trust proxy');
  
  app.use('/', require('../api/index')());

  app.head('/status', (req, res) => { res.status(200).end(); });
  app.get('/status',  (req, res) => { res.status(200).end(); });

  return app;
}
