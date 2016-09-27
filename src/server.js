const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const page = fs.readFileSync(`${__dirname}/../client/index.html`);

const onRequest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page);
  response.end();
};

const app = http.createServer(onRequest).listen(port);

const io = socketio(app);

const onUpdate = (sock) => {
  const socket = sock;

  socket.on('draw', (data) => {
    socket.broadcast.emit('updateRect', data);
  });
};

io.sockets.on('connection', (socket) => {
  console.log('connected');
  onUpdate(socket);
});
