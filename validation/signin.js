const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');
const { regexEmail } = require('../utils/constans');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(regexEmail),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = router;
