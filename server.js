const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const serverHttp = require('http').createServer(app);
const io = require('socket.io')(serverHttp);

//require('./routes.js');

//make a middleware for provide all files on public folder
app.use(express.static(path.join(__dirname, 'public')));
//set views path
app.set('views', path.join(__dirname, 'views'));
//set ejs as html render
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// log all requests
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use(require('./App/Controllers/UserController.js'));
app.use(require('./App/Controllers/AuthController.js'));

app.get('/chat', (req, res) => {
    return res.render('chat.html');
});


serverHttp.listen(3000, function(){
    console.log('Server listening...');
});

io.on('connection', require('./socketio.js'));