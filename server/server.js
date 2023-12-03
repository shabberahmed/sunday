import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
var app=express()
const server=http.createServer(app)
const io = new Server(server, {
  cors :{origin:'*'}
});
let i=0
io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('join', (room) => {
      socket.join(room);
      console.log('user joined room:', room);
    });
  
    socket.on('msg', (data) => {
        console.log(data)
      io.to(data.room).emit('rmsg', data);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
server.listen(1212,()=>console.log("port started on 1212"))

