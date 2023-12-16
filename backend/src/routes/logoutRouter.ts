import express from 'express';

const logoutRouter = express.Router();

logoutRouter.post('/', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
  });

  return res.redirect('/login');
});

export { logoutRouter };