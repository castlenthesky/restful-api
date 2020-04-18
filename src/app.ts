import * as express from 'express'
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path'
import * as favicon from 'serve-favicon'
import router from './routes'
import config from './config';

const app = express();

app.use(cors());
app.use(require('morgan')('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.enable('trust proxy');
app.use(favicon(path.join(__dirname, './', 'public', 'images', 'favicon.ico')));


app.head('/status', (req, res) => { res.status(200).end(); });
app.get('/status',  (req, res) => { res.status(200).end(); });

app.use('/', router());

app.listen(config.port, err => {
  if (err) {
    console.log(err);
    process.exit(1);
    return;
  }
  console.log(`Server started at ${config.appurl} on port ${config.port}`);
})
