import type { TaskType } from '../types';

export const STATUS_LABELS: Record<TaskType['status'], string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

export const STATUS_STYLES: Record<TaskType['status'], string> = {
  todo: 'bg-cyan-100 text-cyan-700 border-cyan-400',
  in_progress: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  done: 'bg-green-100 text-green-700 border-green-400',
};
