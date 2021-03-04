require('dotenv').config({ path: 'backend/config/config.env' });
const path = require('path');
const colors = require('colors');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { socket } = require('./socket');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Setup database connection
connectDB();

// Setup express app
const app = express();
app.use(express.json());
app.use(cors());

// Setup routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/solutions', require('./routes/solutionRoutes'));
app.use('/api/cases', require('./routes/caseRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'))
  );
}

// Setup middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// Socket.io
socket(server);
