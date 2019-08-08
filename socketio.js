let sockets = [];
let messages = [];
module.exports = (socket) => {
    console.log('Socket connected');

    socket.on('userJoined', async (user) => {
        socket.user = user;
        sockets.push(socket);

        var connectedUsers = [];
        await sockets.forEach( (socket) => {
            if(socket.user)
                connectedUsers.push(socket.user);
        });

        console.log(connectedUsers);

        socket.broadcast.emit('userJoined', user);
        socket.emit('latestMessages', messages);
        socket.emit('connectedUsers', connectedUsers);
        socket.broadcast.emit('connectedUsers', connectedUsers);
    });

    socket.on('sendMessage', (message) => {
        console.log('New message:');
        console.log(message);

        message.author = socket.user.author;
        messages.push(message);
        socket.broadcast.emit('newMessage', message);
    });

    socket.on('disconnect', async () => {
        if(!socket.user)
            return;

        console.log('User disconnected:' + socket.id);

        sockets = sockets.filter( (socketItem) => socketItem.id != socket.id);

        var connectedUsers = [];
        await sockets.forEach( (socket) => {
            if(socket.user)
                connectedUsers.push(socket.user);
        });
        socket.broadcast.emit('userDisconnected', socket.user);
        socket.broadcast.emit('connectedUsers', connectedUsers);
    });
}
