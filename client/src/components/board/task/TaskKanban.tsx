import { useMemo, useState } from 'react';
import { useTasks } from '@hooks';
import { type TaskType, type TaskStatus } from '@types';
import { STATUS_LABELS } from '@constants';
import { TaskList } from '../task/TaskList';
import { TaskModal } from '../task/TaskModal';
import { ConfirmDialog } from '@ui/ConfirmDialog';

const STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];

export const TaskKanban = ({ boardId }: { boardId: string | number }) => {
  const { tasks, handleCreate, handleUpdate, handleDelete } = useTasks(boardId);

  const [editing, setEditing] = useState<TaskType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<TaskType | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const groupedTasks = useMemo(() => {
    return STATUSES.reduce(
      (acc, status) => {
        acc[status] = tasks.filter((t) => t.status === status);

        return acc;
      },
      {} as Record<TaskStatus, TaskType[]>,
    );
  }, [tasks]);

  const filteredTasks =
    statusFilter === 'all' ? tasks : tasks.filter((t) => t.status === statusFilter);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <div className="mb-6 flex gap-6">
          <select
            className="focus:ring-1focus:ring-indigo-500 rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
            name="status"
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus)}
          >
            <option value="all">All</option>

            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="rounded bg-cyan-400 px-4 py-2 text-white transition hover:bg-cyan-500"
          >
            + Create Task
          </button>
        </div>
      </div>

      {statusFilter === 'all' ? (
        <div className="flex gap-6 overflow-x-auto pb-2">
          {STATUSES.map((status) => (
            <div key={status} className="min-w-[280px] flex-1">
              <h3 className="mb-2 text-lg font-bold">{STATUS_LABELS[status]}</h3>
              <TaskList
                tasks={groupedTasks[status]}
                onEdit={(task) => {
                  setEditing(task);
                  setModalOpen(true);
                }}
                onDelete={(task) => setDeleting(task)}
                onChangeStatus={async (task, status) => await handleUpdate(task.id, { status })}
              />
            </div>
          ))}
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => {
            setEditing(task);
            setModalOpen(true);
          }}
          onDelete={(task) => setDeleting(task)}
          onChangeStatus={async (task, status) => await handleUpdate(task.id, { status })}
        />
      )}

      {modalOpen && (
        <TaskModal
          initial={editing ?? undefined}
          mode={editing ? 'edit' : 'create'}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={async (data) => {
            if (editing) {
              await handleUpdate(editing.id, data);
            } else {
              await handleCreate(data);
            }

            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete Task"
          message={`Delete task "${deleting.title}"? This action cannot be undone!`}
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await handleDelete(deleting.id);
            setDeleting(null);
          }}
        />
      )}
    </>
  );
};
