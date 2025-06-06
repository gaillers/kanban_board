import Joi from 'joi';

export const tasksSchema = Joi.object({
  boardId: Joi.number().integer().required(),
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('todo', 'in_progress', 'done').required(),
});
