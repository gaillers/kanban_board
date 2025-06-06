import { db } from '../config/knex.js';
import bcrypt from 'bcryptjs';

export async function findUserByEmail(email) {
  return db('users').where({ email }).first();
};

export async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 16);

  const [user] = await db('users')
    .insert({ email, password: hashedPassword })
    .returning(['id', 'email']);

  return user;
};

export async function validateUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return {
    id: user.id,
    email: user.email,
  };
};