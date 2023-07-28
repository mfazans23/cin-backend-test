import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/customError'

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new CustomError('Not Found', 404)
  error.status = 404
  next(error)
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err)

  const errorMessage = err.message || 'Server Error'
  const errorStack = err.stack

  if (res.statusCode === 200) {
    res.status(500)
  }

  res.json({ message: errorMessage, stack: errorStack })
}
