import Joi from 'joi';

export const boardSchema = Joi.object({
  name: Joi.string().min(1).max(128).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 1 character',
    'string.max': 'Name must be at most 128 characters',
  }),
});


