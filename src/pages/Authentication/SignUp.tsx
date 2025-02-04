import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo/logo.svg';
import SvgIcon from '../../components/Svg';
import CustomInputField from '../../components/form/CustomInputField';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import toast from 'react-hot-toast';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const result = await doCreateUserWithEmailAndPassword(
        data.email as string,
        data.password as string,
      );

      if (result && result.user) {
        toast.success('Account created successfully!');
        navigate('/auth/signin');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('error', error);
      toast.error('Something went wrong.');
    }
  };

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
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3.5 rounded-lg p-4 transition border border-primary bg-primary text-white hover:bg-opacity-90"
              >
                Sign Up
              </button>
            </form>

            <div className="my-5">
              <button className="w-full flex items-center justify-center gap-3.5 rounded-lg p-4 transition border border-strokedark bg-meta-4 hover:bg-opacity-50">
                <SvgIcon name="google" />
                Sign up with Google
              </button>
            </div>
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
