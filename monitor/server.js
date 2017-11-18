// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'client')));

io.on('connection', function (socket) {
  var socketId = socket.id;
  socket.on('order', function (message) {
    var msg = '回执：' + JSON.stringify(message);
    socket.emit('clientMsg', msg);
  });
});