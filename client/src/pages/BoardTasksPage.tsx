import { Link, useParams } from 'react-router-dom';
import { TaskKanban } from '@components/board/task/TaskKanban';

export default function BoardTasksPage() {
  const { id: boardId } = useParams<{ id: string }>();

  if (!boardId) {
    return <div>Invalid board</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link to="/boards" className="text-blue-500 hover:underline">
          &larr; Back to Boards
        </Link>
      </div>

      <TaskKanban boardId={boardId} />
    </div>
  );
}
