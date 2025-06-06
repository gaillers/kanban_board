import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

const authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = header.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
