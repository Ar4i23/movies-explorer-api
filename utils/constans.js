const regexUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const regexEmail = /^\S+@\S+\.\S+$/;
const foreignFilm = 'Чужой фильм';
const filmDeleted = 'Фильм удален';
const nonCoreId = 'Неккоректный id';
const filmNotAvailable = 'Фильм с таким id отсутствует';
const userMissing = 'Пользователь с таким id отсутствует';
const userExists = 'Пользователь с таким email уже существует';
module.exports = {
  regexUrl,
  regexEmail,
  foreignFilm,
  filmDeleted,
  nonCoreId,
  filmNotAvailable,
  userMissing,
  userExists,
};
