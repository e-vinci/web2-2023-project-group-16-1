const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io'],
};

const authsRouter = require('./routes/auths');
const usersRouter = require('./routes/users');
const dbUtilsRouter = require('./routes/dbUtils');
const dbUtils2Router = require('./routes/dbUtils2');

const app = express();

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecreteKey = 'Brulans4SteinRhunys';
app.use(
  cookieSession({
    name: 'user',
    keys: [cookieSecreteKey],
    httpOnly: true,
    expires: expiryDateIn3Months,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/auths', authsRouter);
app.use('/users', usersRouter);
app.use('/dbUtils', dbUtilsRouter);
app.use('/dbUtils2', dbUtils2Router);

module.exports = app;
