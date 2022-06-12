const router = require('express').Router();
const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} = require('../controllers/notes');

router.post('/', createNote);
router.get('/', getNotes);
router.delete('/:noteId', deleteNote);
router.put('/:noteId', updateNote);

module.exports = router;
