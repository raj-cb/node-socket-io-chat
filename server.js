const app = require('express')();
const jwt = require('jsonwebtoken');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const fs = require('fs').promises;
const userController = require('./controllers/userController');
const config = require('./constants/config');

const port = config.PORT;

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.sendStatus(200);
    // res.sendFile(__dirname + '/views/index.html');
});

io.use(async(socket, next) => {
    const SECRET_KEY = await fs.readFile(config.SECRET_KEY_FILE_PATH, "binary");
    if (socket.handshake.auth && socket.handshake.auth.token) {
        jwt.verify(socket.handshake.auth.token, SECRET_KEY, function(err, decoded) {
            if (err) {
                return next(new Error('Authentication error'));
            }
            socket.decoded = decoded;
            console.log(decoded);
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {

    socket.on('join-room', (data) => {
        socket.receiverId = data.id;
        socket.senderId = data.senderId;
        socket.join(socket.receiverId);
        socket.join(data.senderId);
        socket.emit('res', 'joined');
    })
    socket.on('send message', msg => {
        userController.saveMessage(msg, socket.receiverId, socket.senderId);
        io.sockets.in([socket.receiverId, socket.senderId]).emit('recieve message', msg);
    });
});

app.post('/messages', (req, res) => {
    io.emit('chat message', req.body);
    res.sendStatus(200);
});


http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});