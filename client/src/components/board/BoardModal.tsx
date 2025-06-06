import { useState } from 'react';

type Props = {
  mode: 'create' | 'edit';
  initial?: { name: string } | undefined;
  onClose: () => void;
  onSave: (name: string) => Promise<void>;
};

export const BoardModal = ({ mode, initial, onClose, onSave }: Props) => {
  const [name, setName] = useState(initial?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      return;
    }
    setLoading(true);

    try {
      await onSave(name.trim());

      setLoading(false);
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Could not connect to server. Please try again later.',
      );
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="min-w-[300px] rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          {mode === 'edit' ? 'Edit Board' : 'Create Board'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              className="w-full rounded border px-3 py-2 focus:border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              placeholder="Board name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
              maxLength={40}
              disabled={loading}
            />

            {error && <p className="absolute text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded bg-cyan-400 px-4 py-2 text-white transition hover:bg-cyan-500"
              disabled={loading || !name.trim()}
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
