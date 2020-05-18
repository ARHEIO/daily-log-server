const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const httpLogger = require('./utils/httpLogger');
const { logger } = require('./utils/logger');
const { handleError } = require('./errors')


// view engine setup
app.set('port', process.env.PORT || 4000);

app.use(httpLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  // Allow CORS requests on stub.
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,accept,api-key');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
  res.set('X-Request-URL', req.url);
  next();
});

app.get('/ping', async (req, res) => {
  res.status(200).send('pong');
})

app.use(require('./routes'));

app.get('/*', async (req, res) => {
  res.status(404).send('{"err": "nothing here fam"}')
})

app.use((err, req, res, next) => {
  handleError(err, res);
});

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err}`)
});

process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled Rejection: ${reason}, ${p}`)
});

http.createServer(app).listen(app.get('port'), () => {
  logger.info(`Server listening on port ${app.get('port')}`);
});
