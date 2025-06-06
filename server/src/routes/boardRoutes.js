import { Router } from 'express';
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/boardController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getBoards); // GET /boards
router.get('/:id', getBoard); // GET /boards/:id
router.post('/', createBoard); // POST /boards
router.put('/:id', updateBoard); // PUT /boards/:id
router.delete('/:id', deleteBoard); // DELETE /boards/:id

export default router;
