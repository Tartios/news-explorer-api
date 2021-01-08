const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/unauthorized.js');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходимо авторизироваться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new Unauthorized('Необходимо авторизироваться');
    next(err);
  }

  req.user = payload;
  next();
};
