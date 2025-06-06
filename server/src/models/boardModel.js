import { db } from '../config/knex.js';

export async function getBoardsByUser(userId) {
  return db('boards').where({ createdBy: userId }).select('*');
}

export async function getBoardById(id, userId) {
  return db('boards').where({ id, createdBy: userId }).first();
}

export async function createBoard(name, userId) {
  const [id] = await db('boards').insert({ name, createdBy: userId });

  return getBoardById(id, userId);
}

export async function updateBoard(id, userId, name) {
  await db('boards').where({ id, createdBy: userId }).update({ name });

  return getBoardById(id, userId);
}

export async function deleteBoard(id, userId) {
  return db('boards').where({ id, createdBy: userId }).del();
}
