const cors = require('cors');
const jwt = require('jsonwebtoken');
const Message = require('./models/Message');

exports.socket = server => {
  const io = require('socket.io')(server, {
    cors: {
      cors,
    },
  });

  // Socket.io server middleware setup
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Unauthorized, no token'));
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (error) {
      return next(new Error('Unauthorized, invalid token'));
    }
  });

  // Socket.io server setup
  io.on('connection', socket => {
    console.log(`${socket.userId} is connected`);
    socket.on('disconnect', () => {
      console.log(`${socket.userId} is disconnected`);
    });
    socket.on('message', async message => {
      try {
        const createdMessage = await Message.create(message);
        socket.emit('newMessage', createdMessage);
      } catch (error) {
        console.log(error);
      }
    });
  });
};
