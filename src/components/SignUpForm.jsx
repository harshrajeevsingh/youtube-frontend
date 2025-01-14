import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@nextui-org/react';

import { useUserStoreSelectors } from '../store/userSlice';
import { Camera } from 'lucide-react';
import { useLoginUser, useRegisterUser } from '../api/authApi';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setUser = useUserStoreSelectors.use.setUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const signupMutation = useRegisterUser();
  const loginMutation = useLoginUser();

  {
    /*On Submit fn with mutation*/
  }
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('avatar', data.avatar[0]);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('fullName', data.fullName);
    if (data.coverImg) {
      formData.append('coverImg', data.coverImg[0]);
    }

    signupMutation.mutate(formData, {
      onSuccess: async () => {
        const loginData = {
          email: data.email,
          password: data.password,
        };
        try {
          const loginResponse = await loginMutation.mutateAsync(loginData);
          setUser(loginResponse?.data?.user);
          queryClient.invalidateQueries('user');
          navigate('/');
        } catch (error) {
          console.error('Error during login:', error);
        }
      },
    });
  };

  const handleFileChange = (e, setPreview) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-20 md:w-2/4 lg:w-1/4 w-full mx-20 flex flex-col"
    >
      {/* Div for the avatar & cover input */}
      <div className="mb-5 relative">
        {/* Cover Image */}
        <div className="relative w-full h-36 rounded-lg overflow-hidden flex items-center justify-center dark:bg-gray-700 bg-white cursor-pointer">
          <label
            htmlFor="cover-upload-input"
            className="flex items-center justify-center w-full h-full"
          >
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera />
            )}
          </label>
          <input
            type="file"
            {...register('coverImg')}
            onChange={(e) => handleFileChange(e, setCoverPreview)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="cover-upload-input"
          />
        </div>

        {/* Avatar image */}
        <div className="absolute top-1/4  transform -translate-x-1/2 -translate-y-2/3 w-24 h-24 rounded-full overflow-hidden flex items-center justify-center dark:bg-gray-700 bg-white cursor-pointer border-4 border-primary-background z-10">
          <label
            htmlFor="avatar-upload-input"
            className="flex items-center justify-center w-full h-full"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera />
            )}
          </label>
          <input
            type="file"
            {...register('avatar', { required: 'Avatar image is required' })}
            onChange={(e) => handleFileChange(e, setAvatarPreview)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="avatar-upload-input"
          />
        </div>

        {errors.avatar && (
          <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
        )}
      </div>

      {/* Regular string form inputs */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          {...register('fullName', { required: 'Name is required' })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Username
        </label>
        <input
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters long',
            },
            maxLength: {
              value: 20,
              message: 'Username must not be 20 characters long',
            },
          })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            maxLength: {
              value: 15,
              message: 'Password should be no longer than 15 characters long',
            },
          })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email address',
            },
          })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {signupMutation.isLoading && <p>Loading...</p>}
      {signupMutation.isError && <p>Error signing up. Please try again.</p>}
      {loginMutation.isError && <p>Error login. Please try again.</p>}

      <Button
        color="primary"
        type="submit"
        className="mt-8"
        isLoading={signupMutation.isPending || loginMutation.isPending}
      >
        Submit
      </Button>
    </form>
  );
};

export default SignupForm;
