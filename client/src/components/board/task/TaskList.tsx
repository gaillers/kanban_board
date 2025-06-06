import { type TaskType, type TaskStatus } from '@types';
import { EmptyState } from '@components/ui/EmptyState';
import { TaskCard } from './TaskCard';

type Props = {
  tasks: TaskType[];
  onEdit: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
  onChangeStatus: (task: TaskType, status: TaskStatus) => void;
};

export const TaskList = ({ tasks, onEdit, onDelete }: Props) => {
  if (!tasks.length) {
    return (
      <div className="mt-4 text-center text-gray-500">
        <EmptyState message="No tasks available. Create your first task!" />
      </div>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
  );
};
