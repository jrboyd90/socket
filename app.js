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
  response.render('index.hbs');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});



//starts up server on port 8888
http.listen(8888, function () {
  console.log('Listening on port 8888');
});
