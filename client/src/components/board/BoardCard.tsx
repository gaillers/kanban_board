import { Link } from 'react-router-dom';
import { type BoardType } from '@types';
import { Pencil, Trash } from 'lucide-react';

type Props = {
  board: BoardType;
  onEdit: () => void;
  onDelete: () => void;
};

export const BoardCard = ({ board, onEdit, onDelete }: Props) => {
  return (
    <div className="relative flex min-w-[220px] items-start justify-between gap-4 rounded bg-white p-4 shadow">
      <Link to={`/boards/${board.id}`} className="text-lg font-semibold hover:text-blue-600">
        {board.name}
      </Link>

      <div className="flex gap-2">
        <button className="rounded p-1 text-blue-500 hover:bg-blue-100" onClick={onEdit}>
          <Pencil size={18} />
        </button>

        <button className="rounded p-1 text-red-500 hover:bg-red-100" onClick={onDelete}>
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};
