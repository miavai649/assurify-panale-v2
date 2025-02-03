import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import SvgIcon from '../../components/Svg';
import CustomInputField from '../../components/form/CustomInputField';

interface AuthButtonProps {
  text: string;
  icon?: string;
  onClick: () => void;
  isPrimary?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  icon,
  onClick,
  isPrimary = false,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center gap-3.5 rounded-lg p-4 transition ${
      isPrimary
        ? 'border border-primary bg-primary text-white hover:bg-opacity-90'
        : 'border border-stroke bg-gray hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50'
    }`}
  >
    {icon && <SvgIcon name={icon} />}
    {text}
  </button>
);

const SignIn: React.FC = () => {
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
            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>
            <span className="mt-15 inline-block">
              <SvgIcon name="authentication" />
            </span>
          </div>

          {/* Right Side Content */}
          <div className="w-full xl:w-1/2 border-stroke dark:border-strokedark xl:border-l-2 p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to TailAdmin
            </h2>

            {/* Sign In Form */}
            <form>
              <CustomInputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon="email"
              />
              <CustomInputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon="password"
              />
              <AuthButton text="Sign In" isPrimary onClick={() => {}} />
            </form>
            <div className="my-5">
              <AuthButton
                text="Sign in with Google"
                icon="google"
                onClick={() => {}}
              />
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
