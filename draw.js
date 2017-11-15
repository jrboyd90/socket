var express = require('express');
var app = express();
//Web socket import
var http = require('http').Server(app);
var io = require('socket.io')(http);

//setup websocket
app.use('/socket-io',
  express.static('node_modules/socket.io-client/dist'));
//setup Handlebars
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.render('draw.hbs');
});
io.on('connection', function(client) {
  console.log('Connected');


  client.on('draw', function(coords){
    console.log('Coords', coords);
    io.emit('do-draw', coords);
  });  
    // client.join(room, function() {
    //   console.log(client.rooms);
    //   io.to(room).emit('chat-msg', '**new user joined**');
    // });
    // if (ROOMS[room]) {
    //     ROOMS[room].push(client.id);
    //   } else {
    //     ROOMS[room] = [client.id];
    //   }
    //   console.log(ROOMS);
    //   ROOMS[room].forEach(function (id) {
    //     if (id != client.id) {
    //       io.to(id).emit('chat-msg', client.id + ' joined**');
    //     }
    //   });
    //   //io.to(client.id).emit('chat-msg', '**thanks for joining**');
    // });
    // client.on('incoming', function(msg){
    //   io.to(msg.room).emit('chat-msg', client.id + ': ' + msg.msg);
    // });


});

//starts up server on port 8888
http.listen(8888, function () {
  console.log('Listening on port 8888');
});
