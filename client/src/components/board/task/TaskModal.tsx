import { useState } from 'react';
import { type TaskType } from '../../../types';

type Props = {
  initial?: Partial<TaskType> | undefined;
  mode: 'create' | 'edit';
  onSave: (data: Omit<TaskType, 'id' | 'boardId'>) => Promise<void>;
  onClose: () => void;
};

export const TaskModal = ({ initial, mode, onSave, onClose }: Props) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [status, setStatus] = useState(initial?.status || 'todo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSave({
        title,
        description,
        status,
      });

      setLoading(false);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="min-w-[350px] rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          {mode === 'edit' ? 'Edit Task' : 'Create Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-3 w-full rounded border px-3 py-2"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={50}
            disabled={loading}
          />
          <textarea
            className="mb-3 w-full rounded border px-3 py-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            disabled={loading}
          />
          <select
            className="mb-3 w-full rounded border px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'todo' | 'in_progress' | 'done')}
            disabled={loading}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {error && <div className="mb-2 text-sm text-red-600">{error}</div>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
              disabled={loading || !title.trim()}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="rounded border border-gray-300 px-4 py-2"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
