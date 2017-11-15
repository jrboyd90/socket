

var canvas = document.getElementById('canvas');
var server  = io();
var ctx = canvas.getContext('2d');

var mouse_down = false;
var past;
var current;

canvas.addEventListener('mousedown', function (event) {
  mouse_down = true;
  console.log('down', event.offsetX, event.offsetY);
});

canvas.addEventListener('mouseup', function (event) {
  mouse_down = false;
  console.log('up', event.offsetX, event.offsetY);
});

canvas.addEventListener('mousemove', function (event) {
  if (mouse_down) {
    console.log('move', event.offsetX, event.offsetY);

    current = [event.offsetX, event.offsetY];
    if (past) {
      send_draw(past, current);
    }

    past = [event.offsetX, event.offsetY];
  }
});

function send_draw (past, current) {
  server.emit('draw', [past, current]);
}
server.on('do-draw', function (coords) {
  draw(coords[0], coords[1]);
});

function draw (past, current) {
  ctx.moveTo(past[0], past[1]);
  ctx.quadraticCurveTo(
    past[0], past[1],
    current[0], current[1]
  );
  ctx.stroke();
  ctx.closePath();
}
