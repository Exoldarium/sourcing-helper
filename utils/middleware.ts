import { NextFunction, Response } from 'express';

const error = (error: Error, res: Response, next: NextFunction) => {
  console.log(error);

  if (error) {
    return res.status(400).json(error);
  }

  return next(error);
};

export { error };