import { Link } from 'react-router-dom';
import { useRegisterForm } from '@hooks';
import { Notification } from '@ui/Notification';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    notification,
    setNotification,
    onSubmit,
  } = useRegisterForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl rounded bg-white p-6 shadow-md"
        noValidate
      >
        <h1 className="mb-4 text-2xl">Create an Account</h1>

        <div className="relative mb-6">
          <input
            type="email"
            placeholder="Email"
            className={`w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none ${
              errors.email
                ? 'border-red-600 focus:ring-red-400'
                : 'border-gray-300 focus:ring-cyan-400'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email',
              },
            })}
          />
          {errors.email && (
            <p className="absolute mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            className={`w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none ${
              errors.password
                ? 'border-red-600 focus:ring-red-400'
                : 'border-gray-300 focus:ring-cyan-400'
            }`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="absolute mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none ${
              errors.confirmPassword
                ? 'border-red-600 focus:ring-red-400'
                : 'border-gray-300 focus:ring-cyan-400'
            }`}
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) => value === (watch('password') || '') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="absolute mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded py-2 text-white transition ${
            isSubmitting ? 'cursor-not-allowed bg-cyan-400' : 'bg-cyan-500 hover:bg-cyan-700'
          }`}
        >
          {isSubmitting ? 'Loading...' : 'Register'}
        </button>

        <Link
          to="/login"
          className="mt-3 inline-block text-sm text-gray-500 transition-colors hover:text-cyan-500"
        >
          Do you have an account?
        </Link>
      </form>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};
