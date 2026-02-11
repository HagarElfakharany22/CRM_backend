
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
       origin: "http://localhost:5173", // or 3000, whatever your Vite/CRA port is
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

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