var socket = io.connect('http://localhost');

function addLine(string) {
  var line = $('<pre>');
  line.text(string);
  $('#output').append(line);
}

socket.on('write', function (string) {
  addLine(string);
});

socket.on('disconnect', function () {
  addLine('DISCONNECTED!');
  addLine('Reload to reconnect...');
});

socket.emit('login', prompt("Name?"));

function sendCommand() {
  socket.emit('command', $('#command').val());
  $('#command').val('').focus();
}

$('#send').click(sendCommand);
$('#command').keyup(function (e) {
  if (e.keyCode === 13) {
    sendCommand();
  }
});