
// import bootstrap from './src/app.controller.js';
// import express from 'express'
// const app=express();
// const port =8000;

// bootstrap(app , express)



// app.listen(port , ()=>{console.log(`listening on ${port}`);
// })

import bootstrap from './src/app.controller.js';
import express from 'express'
import { Server } from 'socket.io';
import { createServer } from 'http';
const app=express();
const port =8000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // أو ["http://192.168.1.5:5173"] لو عايز تحدد
    }
});

io.on('connection', (socket) => {

    console.log('User connected:', socket.id);
    io.emit('server-notification' , {message:'Hello from the server!'});

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

io.engine.on("connection_error", (err) => {
  console.log("Connection Error:", err.message);
  console.log("Context:", err.context);
});

bootstrap(app , express , io)



httpServer.listen(port, () => {
    console.log(`listening on ${port} with Socket.io support`);
});