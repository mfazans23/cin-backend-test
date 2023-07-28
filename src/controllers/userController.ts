import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { AuthRequest } from '../types/customTypes'

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    await User.create({ name, email, password: hashedPassword })

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const secretKey = process.env.JWT_SECRET || 'defaultSecretKey'
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })

    return res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export const getUserInfo = (req: AuthRequest, res: Response): Response => {
  try {
    const user = req.user

    const userInfo = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    }

    return res.status(200).json(userInfo)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}
