const notesRoutes = require('./notes');

module.exports = (app) => {
  app.use('/notes', notesRoutes);
};
