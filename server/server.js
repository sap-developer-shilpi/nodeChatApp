const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
var app = express();
const server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('createMessage',(msg) => {
        io.emit('newMessage',{
       from: msg.from,
       text: msg.text,
       createdAt: new Date().getTime()
    });
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


server.listen(port, () =>{
    console.log(`server up on port ${port}`);
});
