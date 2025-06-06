import { instance } from './instance';

import type { BoardType } from '../types';

export const getBoards = async (): Promise<BoardType[]> => {
  const res = await instance.get<BoardType[]>('/boards');
  return res.data;
};

export const createBoard = async (name: string): Promise<BoardType> => {
  const res = await instance.post<BoardType>('/boards', { name });
  return res.data;
};

export const updateBoard = async (id: number, name: string): Promise<BoardType> => {
  const res = await instance.put<BoardType>(`/boards/${id}`, { name });
  return res.data;
};

export const deleteBoard = async (id: number): Promise<{ message: string }> => {
  const res = await instance.delete<{ message: string }>(`/boards/${id}`);
  return res.data;
};
