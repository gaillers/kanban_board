import { db } from '../config/knex.js';

export async function getTasksByUser(userId, boardId) {
  const query = db('tasks').where({ createdBy: userId });

  if (boardId) query.andWhere({ boardId });

  return query.select('*');
};

export async function getTaskById(id, userId) {
  return db('tasks').where({ id, createdBy: userId }).first();
};

export async function createTask(task, userId) {
  const [id] = await db('tasks').insert({ ...task, createdBy: userId });

  return getTaskById(id, userId);
};

export async function updateTask(id, userId, updates) {
  await db('tasks').where({ id, createdBy: userId }).update(updates);

  return getTaskById(id, userId);
};

export async function deleteTask(id, userId) {
  return db('tasks').where({ id, createdBy: userId }).del();
};
