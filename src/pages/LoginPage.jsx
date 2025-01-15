import { useForm } from 'react-hook-form';
import { Input, Link, Button } from '@nextui-org/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

import { useLoginUser } from '../api/authApi';
import { useUserStoreSelectors } from '../store/userSlice';
import { LockIcon } from '../components/icons/lockIcon';
import { MailIcon } from '../components/icons/mailIcon';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginMutation = useLoginUser();
  const setUser = useUserStoreSelectors.use.setUser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    loginMutation.mutate(loginData, {
      onSuccess: (response) => {
        setUser(response?.data?.user);
        navigate(from, { replace: true });
        toast(`Welcome back ${response?.data?.user?.fullName}`);
      },
    });
  };

  return (
    <div className="w-full h-screen md:h-auto flex justify-center content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full md:w-2/6 w-4/5 flex flex-col justify-center content-center gap-5"
      >
        <h2 className='text-2xl'>Log in</h2>
        <div className='flex flex-col gap-4'>
          <Input
            type="email"
            {...register('email', { required: true })}
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
          <Input
            type="password"
            {...register('password', { required: true })}
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            variant="bordered"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
          <div className="flex py-2 px-1 gap-1">
            Don&apos;t have an account?
            <Link color="primary" href="/signup" size="md">
              Sign up
            </Link>
          </div>
          {loginMutation.isError ? (
            <p className="text-danger-500 pl-1">
              You entered invalid credentials
            </p>
          ) : (
            ''
          )}
        </div>
          <Button
            color="primary"
            type="submit"
            isLoading={loginMutation.isPending}
          >
            Sign in
          </Button>
      </form>
    </div>
  );
};

export default LoginPage;
