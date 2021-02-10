require('dotenv').config({ path: 'backend/config/config.env' });
const colors = require('colors');
const express = require('express');
const connectDB = require('./config/db');
const seedDB = require('./seeder');
const app = express();

//database connection
connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
