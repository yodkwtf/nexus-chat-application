'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/input/Input';
import { useState, useCallback, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle, BsTwitter } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => {
          toast.success('Account created!');
          signIn('credentials', data);
        })
        .catch((err) => {
          const errorCode = err.response.status;

          if (errorCode === 400) {
            toast.error('Please enter your name, email and password!');
          } else if (errorCode === 409) {
            toast.error('Email already exists!');
          } else {
            toast.error('Something went wrong!');
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.error) {
            toast.error(res.error);
          }

          if (res?.ok && !res?.error) {
            toast.success('Entering Nexus!');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.ok && !res?.error) {
          toast.success('Entering Nexus!');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        {/* Auth Form (Login/Register) */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email Address"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button disabled={isLoading} type="submit" fullWidth>
              {variant === 'REGISTER' ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </form>

        {/* Social Login Buttons */}
        <article className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
            <AuthSocialButton
              icon={BsTwitter}
              onClick={() => socialAction('twitter')}
            />
          </div>
        </article>

        {/* Toggle Login/Register */}
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <span>
            {variant === 'REGISTER'
              ? 'Already have an account?'
              : 'New to Nexus?'}
          </span>
          <button
            type="button"
            onClick={toggleVariant}
            className="underline text-blue-500 hover:text-blue-600"
          >
            {variant === 'REGISTER' ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </section>
  );
};
export default AuthForm;
