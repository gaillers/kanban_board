import { useState } from 'react';
import { type BoardType } from '@types';
import { BoardList } from './BoardList';
import { BoardModal } from './BoardModal';
import { ConfirmDialog } from '@ui/ConfirmDialog';
import { createBoard, updateBoard, deleteBoard } from '@api';

type Props = {
  boards: BoardType[];
  refreshBoards: () => Promise<void>;
};

export const BoardKanban = ({ boards, refreshBoards }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BoardType | null>(null);
  const [deleting, setDeleting] = useState<BoardType | null>(null);

  const handleOpenModal = (board: BoardType | null = null) => {
    setEditing(board);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleModalSave = async (name: string) => {
    if (editing) {
      await updateBoard(editing.id, name);
    } else {
      await createBoard(name);
    }

    handleModalClose();
    await refreshBoards();
  };

  const handleDeleteBoard = async () => {
    if (deleting) {
      await deleteBoard(deleting.id);

      setDeleting(null);
      await refreshBoards();
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Boards</h1>
        <button
          onClick={() => handleOpenModal(null)}
          className="rounded bg-cyan-400 px-4 py-2 text-white transition hover:bg-cyan-500"
        >
          + Create Board
        </button>
      </div>

      <BoardList boards={boards} onEdit={handleOpenModal} onDelete={setDeleting} />

      {modalOpen && (
        <BoardModal
          initial={editing ? { name: editing.name } : undefined}
          mode={editing ? 'edit' : 'create'}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete Board"
          message={`Delete board "${deleting.name}"? This action cannot be undone!`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDeleteBoard}
          confirmText="Delete"
          cancelText="Cancel"
          confirmColor="bg-red-600"
        />
      )}
    </>
  );
};
