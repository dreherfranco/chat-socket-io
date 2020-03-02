var socket = io.connect('http://192.168.1.83:8080', {'forceNew': true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(chat, index){
        return (`
            <div class="message">
            <strong class="author">${chat.author}:</strong>
            <p class="text">${chat.text}</p>
            </div>
        `);
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
    var message = {
        author: document.getElementById('author').value,
        text: document.getElementById('text').value
    };
    document.getElementById('author').value = '';
    document.getElementById('text').value = '';
    socket.emit('new-message', message);

    return false;
}