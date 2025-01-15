import SignupForm from '../components/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-screen justify-center items-center">
      <div className="w-full md:w-1/3 flex flex-col gap-2 justify-center items-center">
        <p className="text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <p className="text-xl font-medium">Start your journey on Streamify!</p>
      </div>
      <div className="w-5/6 md:w-1/3 ">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
