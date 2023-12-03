import { NextFunction, Response, Request } from 'express';

const handleError = (error: Error, res: Response, next: NextFunction) => {
  console.log(error);

  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
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
  handleError,
  validateAdmin,
  validateUser
};