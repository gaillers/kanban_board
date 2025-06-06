import { RegisterForm } from '@components/auth/RegisterForm';
import { useRedirectIfAuth } from '@hooks';

export default function RegisterPage() {
  useRedirectIfAuth();

  return (
    <section className="flex min-h-screen px-7 pt-40 pb-16">
      <div className="flex flex-1 items-center justify-center">
        <RegisterForm />
      </div>
    </section>
  );
}
