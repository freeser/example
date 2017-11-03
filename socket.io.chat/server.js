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
    var msg = socket.userName + ': ' + '回执：' + JSON.stringify(message);
    // io.sockets.sockets[socketId].emit('clientMsg', msg); 给指定的socketId发送消息，适用于在其它connect里面
    if (socket.groupId) {
        socket.to(socket.groupId).broadcast.emit('group.emit', msg);
        //io.sockets.in(socket.groupId).emit('group.emit', msg); //方法1.2
    } else {
        socket.emit('clientMsg', msg);
    }
  });
  // 加入群组
  socket.on('group', function (groupId, userName) {
    socket.groupId = groupId;
    socket.userName = userName;
    socket.join(groupId);
    socket.to(socket.groupId).broadcast.emit('group.emit', userName + '加入群组'+ groupId +'成功');
    // io.sockets.in(socket.groupId).emit('group.emit', userName + '加入群组'+ groupId +'成功');
  });
});

io.of('/room1').on('connection', function (socket) {
  socket.on('order', function (message) {
    var msg = socket.userName + ': ' + '回执：' + JSON.stringify(message);
    socket.broadcast.emit('group.emit', msg);
  });
  // 加入群组
  socket.on('join', function (userName) {
    socket.userName = userName;
    socket.broadcast.emit('group.emit', userName + '加入群组room1成功');
  });
});