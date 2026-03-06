import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', socket => {
  console.log('got a connection');

  socket.on('login', username => {
    socket.username = username;
    console.log(username, "connected");
    io.emit('user-connected', username);
  });

  socket.on('msg', msg => {
    const name = socket.username || "Anonymous";
    io.emit('msg', {
      name: `${name} said `,
      msg: msg
    });
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('user-disconnected', socket.username);
    }
  });

});

server.listen(80);
