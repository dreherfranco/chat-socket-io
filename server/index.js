var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/hola', function(req, res){
    res.status(200).send('Hola mundo');
});

server.listen(8080, function(){
    console.log("server conectado en el puerto http://localhost:8080");
});

var messages = [{
    author: "Franco",
    text: "Mensaje de prueba"
}];

io.on('connection', function(socket){
    console.log('El cliente con IP: '+ socket.handshake.address + ' se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

