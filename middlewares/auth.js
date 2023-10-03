const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'movies',
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
