
var mouse_down = false;
var canvas = document.getElementById('canvas');

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
  }
});
