import { BoardCard } from './BoardCard';
import { EmptyState } from '@ui/EmptyState';
import { type BoardType } from '@types';

type Props = {
  boards: BoardType[];
  onEdit: (board: BoardType) => void;
  onDelete: (board: BoardType) => void;
};

export const BoardList = ({ boards, onEdit, onDelete }: Props) => {
  return (
    <>
      {boards.length === 0 ? (
        <div className="mt-4 text-center text-gray-500">
          <EmptyState message="No boards available. Create your first board!" />
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onEdit={() => onEdit(board)}
              onDelete={() => onDelete(board)}
            />
          ))}
        </div>
      )}
    </>
  );
};
