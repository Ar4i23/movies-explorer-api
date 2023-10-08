const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../utils/constans');
const { getMovies, deleteMovie, addMovie } = require('../controllers/movies');

const checkIdLength = () => ({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
router.get('/', getMovies);

router.delete('/:movieId', celebrate(checkIdLength()), deleteMovie);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regexUrl),
      trailerLink: Joi.string().required().pattern(regexUrl),
      thumbnail: Joi.string().required().pattern(regexUrl),
      owner: Joi.object().keys({}),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie,
);

module.exports = router;
