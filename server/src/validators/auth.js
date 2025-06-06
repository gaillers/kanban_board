import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  
  password: Joi.string().min(6).max(64).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password is too short',
    'string.max': 'Password is too long',
  }),

  confirmPassword: Joi.valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
