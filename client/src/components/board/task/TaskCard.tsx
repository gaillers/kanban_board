import { type TaskType } from '@types';
import { STATUS_LABELS, STATUS_STYLES } from '@constants';
import { Pencil, Trash } from 'lucide-react';

type Props = {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
};

export const TaskCard = ({ task, onEdit, onDelete }: Props) => (
  <div className="mb-4 flex items-start justify-between gap-4 rounded-xl border border-cyan-100 bg-white p-5 shadow transition-shadow hover:shadow-lg">
    <div className="flex-1">
      <div className="mb-1 flex items-center gap-2 text-lg font-semibold text-gray-800">
        {task.title}
      </div>
      {task.description && <div className="mb-2 text-sm text-gray-500">{task.description}</div>}
      <div className="mt-1 flex items-center gap-2 text-xs">
        <span
          className={`rounded-full border px-2 py-0.5 font-medium ${STATUS_STYLES[task.status]}`}
        >
          {STATUS_LABELS[task.status]}
        </span>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <button
        className="rounded bg-cyan-400 px-3 py-1 text-xs font-medium text-white transition hover:bg-cyan-500"
        onClick={() => onEdit(task)}
      >
        <Pencil size={18} />
      </button>
      <button
        className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"
        onClick={() => onDelete(task)}
      >
        <Trash size={18} />
      </button>
    </div>
  </div>
);

export default TaskCard;
