const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { regexEmail } = require('../utils/constans');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Мин. длинна поля - 2'],
      maxlength: [30, 'Макс. длинна поля - 30'],
    },
    email: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      unique: true,
      validate: {
        validator(email) {
          return regexEmail.test(email);
        },
        message: 'Введите Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный логин или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неверный логин или пароль');
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
