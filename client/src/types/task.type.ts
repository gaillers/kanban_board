export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskType = {
  id: number;
  boardId: number;
  title: string;
  description: string;
  status: TaskStatus;
};
