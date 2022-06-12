require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');

const { PORT = 3001 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notesdb-dev');

app.use(cors({
  origin: ['http://localhost:3000'],
}));

require('./routes/index')(app);

app.use((req, res, next) => {
  next(new ErrorNotFound('Неправильный путь'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
