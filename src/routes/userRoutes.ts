import express from 'express'
import { registerValidationRules } from '../utils/validationRules'
import {
  registerUser,
  loginUser,
  getUserInfo,
} from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/register', registerValidationRules, registerUser)
router.post('/login', loginUser)
router.get('/me', authMiddleware, getUserInfo)

export default router
