var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('This user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
        console.log(msg);
    })
})

http.listen(3030, () => {
    console.log('listening on *:3030');
})