const socketio = require("socket.io")

const ws = {
    io: null,
}

module.exports.initialize = (server) => {
    ws.io = socketio(server);
    ws.io.on('connection', (socket) => {
        console.log("user connected")
        socket.on("user-connect", userId => {
            console.log(userId)
        })
    })
}

module.exports.io = () => ws.io;