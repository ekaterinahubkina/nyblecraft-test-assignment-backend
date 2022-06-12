const Note = require('../models/note');
const ErrorValidation = require('../errors/ErrorValidation');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.createNote = (req, res, next) => {
  const {
    text, tags,
  } = req.body;

  Note.create({
    text, tags,
  })
    .then((note) => res.send(note))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorValidation('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getNotes = (req, res, next) => {
  Note.find({})
    .then((notes) => res.send(notes))
    .catch((err) => next(err));
};

module.exports.deleteNote = (req, res, next) => {
  Note.findById(req.params.noteId)
    .orFail(() => {
      throw new ErrorNotFound('Заметка не найдена');
    })
    .then((note) => note.remove())
    .then((note) => res.send(note))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorValidation('Неверный _id заметки'));
      } else {
        next(err);
      }
    });
};

module.exports.updateNote = (req, res, next) => {
  const { text, tags } = req.body;
  Note.findByIdAndUpdate(req.params.noteId, { text, tags }, { new: true })
    .orFail(() => {
      throw new ErrorNotFound('Заметка c таким id не найдена');
    })
    .then((note) => res.send(note))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorValidation('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
