require('dotenv').config({ path: 'backend/config/config.env' });
const colors = require('colors');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Setup database connection
connectDB();

// Setup express app
const app = express();
app.use(express.json());
app.use(cors());

// Setup routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/solutions', require('./routes/solutionRoutes'));

// Setup middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

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
});
