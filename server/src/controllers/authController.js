import jwt from 'jsonwebtoken';
import {
  findUserByEmail,
  createUser,
  validateUser,
} from '../models/userModel.js';
import { registerSchema, loginSchema } from '../validators/auth.js';
import { JWT_SECRET } from '../config/env.js';

export async function register(req, res, next) {
  try {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((e) => e.message);

      return res.status(400).json({ message: messages.join('; ') });
    }

    const { email, password } = value;

    const exists = await findUserByEmail(email);

    if (exists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await createUser(email, password);

    res.status(200).json({
      email: user.email,
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((e) => e.message);

      return res.status(400).json({ message: messages.join('; ') });
    }

    const { email, password } = value;

    const user = await validateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      token,
      email: user.email,
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
}