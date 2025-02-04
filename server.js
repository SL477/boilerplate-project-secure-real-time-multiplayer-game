require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

// Helmet
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.hidePoweredBy({setTo: 'PHP 7.4.3'}));
const nocache = require('nocache');
app.use(nocache());

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));
app.use('/socket.io', express.static(process.cwd() + '/socket.io'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

// Attach SocketIO
let io = socket();
io.attach(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

let playerInfo = {};

io.on("connection", socket => {
  console.log('user connected');
  socket.id = Date.now();
  socket.on("test", msg => {
    console.log('socket msg', socket.id, msg);
  });

  socket.on("playerdata", msg => {
    playerInfo[socket.id] = msg;
    // console.log('playerInfo', playerInfo);
    socket.emit('allplayers', playerInfo);
  });

  socket.on("disconnect", () => {
    console.log('user disconnected', socket.id);
    if (playerInfo[socket.id]) {
      delete playerInfo[socket.id];
    }
  });
});
//io.on("disconnect", (d) => console.log('user disconnected', d));


module.exports = app; // For testing
