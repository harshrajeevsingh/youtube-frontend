import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../../api/authApi";
import useUserStore from "../../store/userSlice";
import { useUserStoreSelectors } from "../../store/userSlice";
import MailIcon from "../icons/mailIcon";
import LockIcon from "../icons/lockIcon";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginMutation = useLoginUser();
  const setUser = useUserStoreSelectors.use.setUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    loginMutation.mutate(loginData, {
      onSuccess: (response) => {
        console.log("Login response:", response);
        setUser(response?.data?.user);
        console.log("Updated State:", useUserStore.getState());
        onOpenChange(false);
      },
    });
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  type="email"
                  {...register("email", { required: true })}
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
                  {...register("password", { required: true })}
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
                {/* <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Sign in
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
