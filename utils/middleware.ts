import { NextFunction, Response, Request } from 'express';

const error = (error: Error, res: Response, next: NextFunction) => {
  console.log(error);

  if (error) {
    return res.status(400).json(error);
  }

  return next(error);
};

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.session.user;
  const admin = req.session.admin;
  const userDisabled = req.session.disabled;

  if (!(currentUser && admin) || userDisabled) return res.status(403).send('Not allowed');

  return next();
};

export {
  error,
  validateAdmin
};