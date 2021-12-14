const app = require('express')();
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.sendStatus(200);
    // res.sendFile(__dirname + '/views/index.html');
});
var SECRET_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApwAJekqX515MTQyNWMQ8
r2O3N3xwB5HBTr1Fdv3xmJAL2m84/mUlgkuMGggOOi8RmRjf1I2zYUMvare7EbKo
rKgRZFva1LozOI7K+5V6cJJotKNBfCB+BujwbsasXkuyAKSmLL2BVtV7AgxJPVKC
Gl0N+qIWMiLJ9BD5F1arPeukDY3peUPyw/Z+oefUdFYf5l7U3VDYN+3EXUO/aBV8
MTQhWrc2Q/25F04Ep/TOamkEoVdRnjMS4IjFxw/QrvLSfsNMuNok6g51Y7NuuHk7
+HCLf22MGsipVYZzKY6flFbw3tI1m86bMJybQIzC37EvPoQCI9/PUW8FUWaXrBXD
lWepdO62S1M+XNIXygC1eY4xojhUzJ+5LIQe0JRqmP7KtbfFQ1RZ/3H3wNLndTRH
/yMv3q4yA1lRH3PexmHyA1mvyDuNqs7UNEDzxc0DuxcDK7HNNAcM6JNtMnoYeEd1
yzYsb+wd3/pMz8uws9JRAcXU9wF0QhrqlxNEgwM+MjDetDgq6ttFcXZP0LobaWHS
CyTaePCq8Y38TJTk0Oh4x9sBDKDG9ealIZQw+Ut94VomJ7YXcjG1/3CX9zxTCBwf
z7xAb5038lQemrG4ePZT6dl2lV1rQMVSCFBP3Zd0vihe8xZzUliPx2xQF4NcWAsT
Z8SvZn8BP2cUVVh1GsGl300CAwEAAQ==
-----END PUBLIC KEY-----`;

io.use(function(socket, next) {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        jwt.verify(socket.handshake.auth.token, SECRET_KEY, function(err, decoded) {
            if (err) {
                return next(new Error('Authentication error'));
            }
            socket.decoded = decoded;
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