import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { AuthRequest } from '../types/customTypes'

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' })
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'defaultSecretKey'
    const decodedToken = jwt.verify(token, secretKey) as { userId: number }
    const user = await User.findByPk(decodedToken.userId)

    if (!user) {
      return res.status(401).json({ message: 'Authorization denied' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export default authMiddleware
