import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import SvgIcon from '../../components/Svg';
import CustomInputField from '../../components/form/CustomInputField';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import Logo from '../../images/logo/logo.svg';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log('👀 ~ handleSubmit ~ data:', data);

    try {
      const result = await doCreateUserWithEmailAndPassword(
        data.email as string,
        data.password as string,
      );

      if (result && result.user) {
        toast.success('Account created successfully, Please log in now');
        navigate('/auth/signin');
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('error', error);
      toast.error('Something went wrong.');
    }
  };

  // handle google sign up function
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await doSignInWithGoogle();

  //     if (typeof result !== 'string' && result?.user) {
  //       toast.success('Logged In Successfully');
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     console.error('Google Sign-In Error:', error);
  //     toast.error('Something Went Wrong');
  //   }
  // };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-boxdark-2 text-bodydark">
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-auto rounded-sm border border-strokedark bg-boxdark shadow-default flex">
          {/* Left Side Content */}
          <div className="hidden xl:flex xl:w-1/2 flex-col items-center justify-center text-center py-17.5 px-26 bg-boxdark-3">
            <div className="mb-5.5">
              <img src={Logo} alt="Logo" />
            </div>
            <span className="mt-15">
              <SvgIcon name="authentication" />
            </span>
          </div>

          {/* Right Side Content */}
          <div className="w-full xl:w-1/2 p-4 sm:p-12.5 xl:p-17.5 flex flex-col justify-center">
            <h2 className="mb-9 text-2xl font-bold text-white sm:text-title-xl2">
              Sign Up
            </h2>

            {/* Sign up form */}
            <form onSubmit={handleSubmit} className="w-full">
              <CustomInputField
                labelContent={
                  <label className="mb-2.5 block font-medium text-white">
                    Name
                  </label>
                }
                type="text"
                name="name"
                placeholder="Enter your name"
                icon="user"
              />
              <CustomInputField
                labelContent={
                  <label className="mb-2.5 block font-medium text-white">
                    Email
                  </label>
                }
                type="email"
                name="email"
                placeholder="Enter your email"
                icon="email"
              />
              <CustomInputField
                labelContent={
                  <label className="mb-2.5 block font-medium text-white">
                    Password
                  </label>
                }
                type="password"
                name="password"
                placeholder="Enter your password"
                icon="password"
              />
              <CustomButton
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="mt-4 w-full"
              >
                Sign Up
              </CustomButton>
            </form>

            {/* <div className="my-5">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3.5 rounded-lg px-4 py-2 transition border border-strokedark bg-meta-4 hover:bg-opacity-50"
              >
                <SvgIcon name="google" />
                Sign up with Google
              </button>
            </div> */}
            <div className="mt-6 text-center">
              <p>
                Already have an account?{' '}
                <Link to="/auth/signin" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
