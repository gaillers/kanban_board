import { useCallback, useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@api';
import { type TaskType } from '@types';

export const useTasks = (boardId?: string | number) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTasks = useCallback(async () => {
    setLoading(true);

    if (!boardId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const data = await getTasks(Number(boardId));
    setTasks(data);
    setLoading(false);
  }, [boardId]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const handleCreate = async (data: Omit<TaskType, 'id' | 'boardId' | 'createdBy'>) => {
    if (!boardId) {
      return;
    }

    await createTask({ ...data, boardId: Number(boardId) });
    await refreshTasks();
  };

  const handleUpdate = async (
    id: number,
    data: Partial<Omit<TaskType, 'id' | 'boardId' | 'createdBy'>>,
  ) => {
    await updateTask(id, { ...data, boardId: Number(boardId) });
    await refreshTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    await refreshTasks();
  };

  return {
    tasks,
    loading,
    refreshTasks,
    handleCreate,
    handleUpdate,
    handleDelete,
    setTasks,
  };
};
