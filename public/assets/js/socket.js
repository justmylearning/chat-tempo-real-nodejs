var socket = io('http://localhost:3000');
var connectedUsers = [];

socket.on('newMessage', (message)=>{
    console.log('newMessage', message);
    var me = $('.author')[0].value;
    var to = message.to;
    if(to == 'all' || to == me){
        var messageTemplate = makeMessageTemplate(message.author, message.message, false, to);
        messageAppend(messageTemplate);
    }
});

socket.on('userJoined', (user) => {
    $('.messages').append(`<h6 class="text-center">${user.author} entrou na sala</h6>`);
});

socket.on('userDisconnected', (user) => {
    $('.messages').append(`<h6 class="text-center">${user.author} saiu da sala</h6>`);
});

socket.on('latestMessages', (messages) => {
    messages.forEach( (message) => {
        var messageObj = {message:message.message, author:message.author};
        var me = $('.author')[0].value;

        if(messageObj.author == me)
            var messageTemplate = makeMessageTemplate(messageObj.author, messageObj.message, true);
        else
            var messageTemplate = makeMessageTemplate(messageObj.author, messageObj.message, false); 
        messageAppend(messageTemplate);
    });
});

socket.on('connectedUsers', (connectedUsersFromServer) => {
    var me = $('.author')[0].value;
    console.log('connectedUsers: ', connectedUsersFromServer);
    connectedUsers = [ {author:'all'} ];
    connectedUsers = connectedUsers.concat(connectedUsersFromServer);
    var optionsTemplate = '';

    connectedUsers.forEach((user) => {
        if(user.author == me) return;
        if(user.author == 'all')
            var option = `<option value="${user.author}">Todos</option>"`;
        else
            var option = `<option value="${user.author}">${user.author}</option>"`;
        optionsTemplate += option;
    });

    console.log(optionsTemplate);
    $('.select-destination').html(optionsTemplate);
});