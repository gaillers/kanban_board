import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginUser } from '@api';
import { useAuth } from '@/context/AuthContext';

export type LoginFormData = {
  email: string;
  password: string;
};

type NotificationType = {
  type: 'success' | 'error';
  message: string;
} | null;

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>();

  const [notification, setNotification] = useState<NotificationType>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [notification]);

  const { setToken } = useAuth();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setNotification(null);

    try {
      const result = await loginUser(data);

      setToken(result.token);
      setNotification({ type: 'success', message: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/boards'), 1500);
    } catch (err: any) {
      if (err.response?.data?.fieldErrors) {
        const fieldErrors = err.response.data.fieldErrors;

        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field as keyof LoginFormData, { type: 'server', message: message as string });
        });
      } else {
        setNotification({
          type: 'error',
          message: err.response?.data?.message || err.message || 'Login failed',
        });
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    notification,
    setNotification,
    onSubmit,
  };
};
