import { instance } from './instance';
import { type TaskType } from '../types';

export const getTasks = async (boardId: number) => {
  const res = await instance.get<TaskType[]>(`/tasks?boardId=${boardId}`);
  return res.data;
};

export const getTask = async (id: number) => {
  const res = await instance.get<TaskType>(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (task: Omit<TaskType, 'id' | 'createdBy'>) => {
  const res = await instance.post<TaskType>('/tasks', task);
  return res.data;
};

export const updateTask = async (
  id: number,
  updates: Partial<Omit<TaskType, 'id' | 'createdBy'>>,
) => {
  const res = await instance.put<TaskType>(`/tasks/${id}`, updates);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await instance.delete<{ message: string }>(`/tasks/${id}`);
  return res.data;
};
