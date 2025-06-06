import {
  getTasksByUser,
  getTaskById,
  createTask as createTaskModel,
  updateTask as updateTaskModel,
  deleteTask as deleteTaskModel
} from '../models/tasksModel.js';
import { tasksSchema } from '../validators/tasks.js';

export async function getTasks(req, res) {
  try {
    const { boardId } = req.query;
    const tasks = await getTasksByUser(req.user.userId, boardId);

    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function getTask(req, res) {
  try {
    const { id } = req.params;
    const task = await getTaskById(id, req.user.userId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function createTask(req, res) {
  try {
    const { error, value } = tasksSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      return res.status(400).json({ message: errors.join('; ') });
    }

    const task = await createTaskModel(value, req.user.userId);

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = tasksSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      return res.status(400).json({ message: errors.join('; ') });
    }

    const task = await updateTaskModel(id, req.user.userId, value);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteTaskModel(id, req.user.userId);

    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted' });
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Server error' });
  }
}
