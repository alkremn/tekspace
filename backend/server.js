require('dotenv').config({ path: 'backend/config/config.env' });
const colors = require('colors');
const express = require('express');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Setup database connection
connectDB();

// Setup express app
const app = express();
app.use(express.json());

// Setup routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));

// Setup middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
