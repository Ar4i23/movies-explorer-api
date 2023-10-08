const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const Movie = require('../models/movie');
const {
  foreignFilm,
  filmDeleted,
  nonCoreId,
  filmNotAvailable,
} = require('../utils/constans');
const BadReqestError = require('../errors/BadReqestError');
const NotFoundError = require('../errors/NotFountError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(HTTP_STATUS_OK).send(movies);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(foreignFilm);
      }
      Movie.deleteOne(movie)
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: filmDeleted });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqestError(nonCoreId));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(filmNotAvailable));
      } else {
        next(err);
      }
    });
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqestError(err.message));
      } else {
        next(err);
      }
    });
};
