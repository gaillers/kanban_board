import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { registerUser } from '@api';

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type NotificationType = {
  type: 'success' | 'error';
  message: string;
} | null;

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const [notification, setNotification] = useState<NotificationType>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [notification]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setNotification(null);

    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });

      return;
    }

    try {
      await registerUser(data);

      setNotification({ type: 'success', message: 'Registration successful! Please log in.' });

      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      if (err.response?.data?.fieldErrors) {
        const fieldErrors = err.response.data.fieldErrors;

        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field as keyof RegisterFormData, { type: 'server', message: message as string });
        });
      } else {
        setNotification({
          type: 'error',
          message: err.response?.data?.message || err.message || 'Registration failed',
        });
      }
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    setError,
    errors,
    isSubmitting,
    notification,
    setNotification,
    onSubmit,
  };
};
