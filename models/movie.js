const mongoose = require('mongoose');
const { regexUrl } = require('../utils/constans');

const cardSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
    },
    director: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
    },
    duration: {
      type: Number,
      required: [true, 'Обязательно для заполнения'],
    },
    year: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
    },
    description: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
    },

    image: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      validate: {
        validator(url) {
          return regexUrl.test(url);
        },
        message: 'Введен не верный формат URL',
      },
    },

    trailerLink: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      validate: {
        validator(url) {
          return regexUrl.test(url);
        },
        message: 'Введен не верный формат URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
      validate: {
        validator(url) {
          return regexUrl.test(url);
        },
        message: 'Введен не верный формат URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Обязательно для заполнения'],
    },
    nameRU: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
    },
    nameEN: {
      type: String,
      required: [true, 'Обязательно для заполнения'],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', cardSchema);
