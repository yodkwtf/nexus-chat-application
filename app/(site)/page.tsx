import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <section className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          className="mx-auto w-auto"
          height={48}
          width={48}
          src="/images/logo.svg"
        />

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      {/* Auth Form */}
      <AuthForm />
    </section>
  );
}
