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
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('order', function (did, cfg) {
    var msg = '回执：' + JSON.stringify(cfg);
    // we tell the client to execute 'new message'
    // sockets.broadcast.to(did).emit('clientMsg', msg); //方法1.1
    // io.sockets.in(did).emit('clientMsg', msg); //方法1.2
    socket.emit('device_' + did, msg); //方法2
  });

  // when the client emits 'add user', this listens and executes
  socket.on('ready', function (deviceId) {
    // socket.join(deviceId);  //方法1
    //方法1、2
    socket.emit('login', deviceId);
  });

  // when the user disconnects.. perform this
  //socket.on('disconnect', function () {
  //  socket.emit('device left'); //设备离线时推送
  //});
});
