// messageAppend( makeMessageTemplate('Marco', 'Eae beleza?', true) );
// messageAppend( makeMessageTemplate('Rafael', 'Beleza e voce?', false) );

$('.btn-leave').on('click', (event) => {
    socket.disconnect();
    $('.btn-leave').hide();
    $('.btn-join').show();
});

$('.btn-join').on('click', (event) => {
    if(!socket.connected)
        socket.open();

    var author = $('.author')[0].value;
    if(!author)
        return alert('Digite seu nome');
    $('.btn-join').hide();
    $('.btn-leave').show();
    $('.btn-send-message').removeAttr('disabled');
    socket.emit('userJoined', {author:author});
});

$('.btn-send-message').on('click', (event) => {
    var author = $('.author')[0].value;
    if(!author) return alert('Preencha o seu nome');
    var messageContent = $('.message-content')[0].value;
    if(!messageContent) return alert('Preencha sua mensagem');

    var to = $('.select-destination')[0].value;
    var messageTemplate = makeMessageTemplate(author, messageContent, true, to);
    messageAppend(messageTemplate);
    socket.emit('sendMessage', {author:author,message:messageContent,to:to});
    $('.message-content')[0].value = '';
    $('.messages-wrapper')[0].scrollTop = $('.messages-wrapper')[0].scrollHeight;
});

function messageAppend(messageTemplate){
    $('.messages').append(messageTemplate);
}

function makeMessageTemplate( author, message, fromMe, to = 'all', time = new Date().toLocaleTimeString() ){
    var privateMessageClass = (to != 'all') ? 'private-message' : '';
    to = (to == 'all') ? 'Todos' : to;

    if(fromMe)
        var template = `<div class="message message-from-me text-right ${privateMessageClass}">
                            <div>
                                <h6><span>${time}</span> ${author} (${to}):</h6>
                                <p>${message}</p>
                            </div>
                        </div>`;
    else
        var template = `<div class="message  ${privateMessageClass}">
                            <h6><span>${time}</span> ${author} (${to}):</h6>
                            <p>${message}</p>
                        </div>`;

    return template;
}