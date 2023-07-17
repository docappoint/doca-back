const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const user_routes = require('./routes/user.routes.js');
const turno_routes = require('./routes/turno.routes.js');
const message_routes = require('./routes/message.routes.js');
// const { CLIENT_PORT } = process.env;

require('./db.js');

const server = express();

server.name = 'BACK';

server.use(cookieParser());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', `*`); // update to match the domain you will make the request from (FRONT)
 res.header('Access-Control-Allow-Credentials', 'true');
 res.header(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept',
 );
 res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 next();
});

server.use('/', user_routes, turno_routes, message_routes);

server.use((err, req, res, next) => {
 eslint-disable-line; no-unused-vars;
 const status = err.status || 500;
 const message = err.message || err;
 console.error(err);
 res.status(status).send(message);
});

module.exports = server;
