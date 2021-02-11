require('dotenv').config({ path: 'backend/config/config.env' });
const colors = require('colors');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
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
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
