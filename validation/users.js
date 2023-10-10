const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexEmail } = require('../utils/constans');
const { getUserMe, updateUserMe } = require('../controllers/users');

router.get('/me', getUserMe);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().pattern(regexEmail),
      password: Joi.string().required(),
    }),
  }),
  updateUserMe,
);

module.exports = router;
