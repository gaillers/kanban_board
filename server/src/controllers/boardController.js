import {
  getBoardsByUser,
  getBoardById,
  createBoard as createBoardModel,
  updateBoard as updateBoardModel,
  deleteBoard as deleteBoardModel,
} from '../models/boardModel.js';
import { boardSchema } from '../validators/board.js';

export async function getBoards(req, res) {
  try {
    const boards = await getBoardsByUser(req.user.userId);

    return res.status(200).json(boards);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function getBoard(req, res) {
  try {
    const { id } = req.params;
    const board = await getBoardById(id, req.user.userId);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function createBoard(req, res) {
  try {
    const { error, value } = boardSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      return res.status(400).json({ message: errors.join('; ') });
    }

    const { name } = value;

    const board = await createBoardModel(name, req.user.userId);

    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function updateBoard(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = boardSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      return res.status(400).json({ message: errors.join('; ') });
    }

    const { name } = value;

    const board = await updateBoardModel(id, req.user.userId, name);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function deleteBoard(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteBoardModel(id, req.user.userId);

    if (!deleted) {
      return res.status(404).json({ message: 'Board not found' });
    }

    return res.status(200).json({ board: deleted, message: 'Board deleted' });
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}
