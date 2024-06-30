import { useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../store/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { Button } from "@nextui-org/react";
import axiosInstance from "../helpers/axios";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const signupMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const { data } = await axiosInstance.post("/users/register", formData);
        return data;
      } catch (error) {
        console.error("Error during signup:", error);
        if (error.response) {
          // Server responded with a status other than 200 range
          throw new Error(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          // Request was made but no response received
          throw new Error("Network error. Please try again.");
        } else {
          // Something happened in setting up the request
          throw new Error("Error signing up. Please try again.");
        }
      }
    },
    onSuccess: async (data) => {
      const loginData = {
        username: data.username,
        password: data.password,
      };
      try {
        const { data: loginResponse } = await axiosInstance.post(
          "/users/login",
          loginData
        );
        setUser(loginResponse.user);
        queryClient.invalidateQueries("user");
      } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Error logging in. Please try again.");
      }
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage[0]);
    }

    signupMutation.mutate(formData);
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
        <div className="relative w-full h-36 rounded-lg overflow-hidden flex items-center justify-center bg-slate-950 cursor-pointer border-2 border-gray-300">
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
            {...register("coverImage")}
            onChange={(e) => handleFileChange(e, setCoverPreview)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="cover-upload-input"
          />
        </div>

        {/* Avatar image */}
        <div className="absolute top-1/4  transform -translate-x-1/2 -translate-y-2/3 w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 cursor-pointer border-2 border-dashed border-gray-300 z-10">
          <label
            htmlFor="avatar-upload-input"
            className="flex items-center justify-center w-full h-full bg-slate-950"
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
            {...register("avatar", { required: true })}
            onChange={(e) => handleFileChange(e, setAvatarPreview)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="avatar-upload-input"
          />
        </div>

        {errors.avatar && (
          <p className="text-red-500 text-sm mt-1">Avatar Image is required</p>
        )}
      </div>

      {/* Regular string form inputs */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          {...register("fullName", { required: true })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">Name is required</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Username
        </label>
        <input
          {...register("username", { required: true })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">Username is required</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">Password is required</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">Email is required</p>
        )}
      </div>

      {signupMutation.isLoading && <p>Loading...</p>}
      {signupMutation.isError && <p>Error signing up. Please try again.</p>}

      <Button color="primary" type="submit" className="mt-8">
        Submit
      </Button>
    </form>
  );
};

export default SignupForm;
