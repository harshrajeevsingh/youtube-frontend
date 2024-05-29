import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUserStore from "../store/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      const { data } = await axios.post("/api/signup", formData);
      return data;
    },
    onSuccess: (data) => {
      const loginData = {
        username: data.username,
        password: data.password,
      };
      const loginResponse = axios.post("/api/login", loginData);
      setUser(loginResponse.data.user);
      queryClient.invalidateQueries("user");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("fullName", { required: true })} />
        {errors.fullName && <p>Name is required</p>}
      </div>

      <div>
        <label>Username</label>
        <input {...register("username", { required: true })} />
        {errors.username && <p>Username is required</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>Password is required</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>Email is required</p>}
      </div>

      <div>
        <label>Avatar Image</label>
        <input
          type="file"
          {...register("avatar", { required: true })}
          onChange={(e) => handleFileChange(e, setAvatarPreview)}
        />
        {errors.avatar && <p>Avatar Image is required</p>}
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            width="100"
            height="100"
          />
        )}
      </div>

      <div>
        <label>Cover Image</label>
        <input
          type="file"
          {...register("coverImage")}
          onChange={(e) => handleFileChange(e, setCoverPreview)}
        />
        {coverPreview && (
          <img
            src={coverPreview}
            alt="Cover Preview"
            width="100"
            height="100"
          />
        )}
      </div>

      {signupMutation.isLoading && <p>Loading...</p>}
      {signupMutation.isError && <p>Error signing up. Please try again.</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
