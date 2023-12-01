import { NextFunction, Response } from 'express';

const error = (error: Error, res: Response, next: NextFunction) => {
  console.log(error);

  if (error) {
    return res.status(400).json(error);
  }

  return next(error);
};

// TODO: read on declaration merging in order to introduce middleware
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript/40762463#40762463

export { error };