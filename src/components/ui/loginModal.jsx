import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useLoginUser } from '../../api/authApi';
import { useUserStoreSelectors } from '../../store/userSlice';
import { MailIcon } from '../icons/mailIcon';
import { LockIcon } from '../icons/lockIcon';

export const LoginModal = ({ isOpen, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginMutation = useLoginUser();
  const setUser = useUserStoreSelectors.use.setUser();

  const onSubmit = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    loginMutation.mutate(loginData, {
      onSuccess: (response) => {
        setUser(response?.data?.user);
        onOpenChange(false);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
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
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                isDisabled={loginMutation.isPending}
              >
                Close
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={loginMutation.isPending}
              >
                Sign in
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
