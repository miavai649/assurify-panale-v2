import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import SvgIcon from '../../components/Svg';
import CustomInputField from '../../components/form/CustomInputField';

const SignIn: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log('Form Data Submitted:', data);
  };

  return (
    <>
      <Breadcrumb pageName="Sign In" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          {/* Left Side Content */}
          <div className="hidden w-full xl:block xl:w-1/2 text-center py-17.5 px-26">
            <div className="mb-5.5 inline-block">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </div>
            <p className="2xl:px-20">Lorem ipsum dolor sit amet.</p>
            <span className="mt-15 inline-block">
              <SvgIcon name="authentication" />
            </span>
          </div>

          {/* right side content  */}
          <div className="w-full xl:w-1/2 border-stroke dark:border-strokedark xl:border-l-2 p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In
            </h2>

            {/* sign in form */}
            <form onSubmit={handleSubmit}>
              <CustomInputField
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                icon="email"
              />
              <CustomInputField
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                icon="password"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3.5 rounded-lg p-4 transition border border-primary bg-primary text-white hover:bg-opacity-90"
              >
                Sign In
              </button>
            </form>

            <div className="my-5">
              <button className="w-full flex items-center justify-center gap-3.5 rounded-lg p-4 transition border border-stroke bg-gray hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <SvgIcon name="google" />
                Sign in with Google
              </button>
            </div>
            <div className="mt-6 text-center">
              <p>
                Don’t have an account?{' '}
                <Link to="/auth/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
