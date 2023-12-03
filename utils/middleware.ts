import { NextFunction, Response, Request } from 'express';

// READ: https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/
const errorMiddleware = (error: Error, res: Response, next: NextFunction) => {
  console.log(error);

  if (error) {
    return res.status(400).json(error);
  }

  return next(error);
};

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.disabled) return res.status(403).send('Not allowed');

  return next();
};

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.session.user;
  const admin = req.session.admin;
  const userDisabled = req.session.disabled;

  if (!(currentUser && admin) || userDisabled) return res.status(403).send('Not allowed');

  return next();
};

export {
  errorMiddleware,
  validateAdmin,
  validateUser
};