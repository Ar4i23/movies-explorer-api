require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const cors = require('cors');
const { limiter } = require('./utils/limiter');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, bitfilmsdb } = process.env;

const app = express();
app.use(cors());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(bitfilmsdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(requestLogger);
app.use(limiter);
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
