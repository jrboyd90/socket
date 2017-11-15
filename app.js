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
  response.render('chat.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');
  client.on('disconnect', function () {
    console.log('EXITED');
  });
});

//starts up server on port 8888
app.listen(8888, function () {
  console.log('Listening on port 8888');
});
