import { instance } from './instance';

export const registerUser = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await instance.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await instance.post('/auth/login', data);
  return response.data;
};
