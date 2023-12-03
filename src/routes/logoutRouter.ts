import express from 'express';

const logoutRouter = express.Router();

logoutRouter.get('/', (req, res, next) => {
  const user = req.session.user;

  if (!user) return res.status(400).send('Already logged out');

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
  });

  return res.status(200).end();
});

export { logoutRouter };