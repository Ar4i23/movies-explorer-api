const router = require('express').Router();
const usersRouter = require('../validation/users');
const moviesRouter = require('../validation/movies');
const signupRouter = require('../validation/signup');
const signinRouter = require('../validation/signup');
const auth = require('../middlewares/auth');
const NotFountError = require('../errors/NotFountError');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFountError('Страница не найдена'));
});

module.exports = router;
