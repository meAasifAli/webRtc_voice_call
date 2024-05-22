const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json())
app.use(express.static('public'));

const PORT = 5000

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('call', (data) => {
        io.to(data.to).emit('call', {
            from: socket.id,
            offer: data.offer,
        });
    });

    socket.on('answer', (data) => {
        io.to(data.to).emit('answer', {
            from: socket.id,
            answer: data.answer,
        });
    });
    socket.on('candidate', (data) => {
        io.to(data.to).emit('candidate', {
            from: socket.id,
            candidate: data.candidate,
        });
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});