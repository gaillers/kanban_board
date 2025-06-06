import { useBoards } from '@hooks';
import { BoardKanban } from '@components/board/BoardKanban';
import { getBoards } from '@/api';

export default function BoardsPage() {
  const { boards, setBoards } = useBoards();

  const refreshBoards = async () => {
    const data = await getBoards();
    setBoards(data);
  };

  return (
    <div className="container mx-auto p-4">
      <BoardKanban boards={boards} refreshBoards={refreshBoards} />
    </div>
  );
}
