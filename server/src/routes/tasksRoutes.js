import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasksController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks); // GET /tasks?boardId=...
router.get('/:id', getTask); // GET /tasks/:id
router.post('/', createTask); // POST /tasks
router.put('/:id', updateTask); // PUT /tasks/:id
router.delete('/:id', deleteTask); // DELETE /tasks/:id

export default router;
