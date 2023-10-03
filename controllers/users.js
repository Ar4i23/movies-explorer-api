const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqestError = require('../errors/BadReqestError');
const NotFoundError = require('../errors/NotFountError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(HTTP_STATUS_OK).send({ email: user.email, name: user.name }))
    .catch(next);
};

module.exports.updateUserMe = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.findByIdAndUpdate(
      req.user._id,
      { name, email, password: hash },
      { new: true, runValidators: true },
    ))
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqestError(err.message));
      } else if (err.name === 'TypeError') {
        next(new BadReqestError(err.message));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с таким id отсутствует'));
      } else if (err.name === 'MongoServerError') {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(HTTP_STATUS_CREATED).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'movies',
        {
          expiresIn: '7d',
        },
      );
      res.status(HTTP_STATUS_OK).send({ token });
    })
    .catch((err) => next(err));
};
