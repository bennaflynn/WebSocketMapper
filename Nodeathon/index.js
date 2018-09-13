var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {


    socket.on('disconnect', (name) => {
        console.log(name);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);

    })

    socket.on('new user', (user) => {
        if(user[0] != "") {
            user = new User(user[0], user[1], user[2]);
            users.push(user);
            console.log(users);
            io.emit('newUsers',users);
        }
       
    })
})

http.listen(3030, () => {
    console.log('listening on *:3030');
})

var users = [];

class User {
    constructor(name, lat, long) {
        this.name = name;
        this.lat = lat;
        this.long = long;
    }
}