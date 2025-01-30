import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'primary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isIconOnly?: boolean;
  btnType?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<ButtonProps> = ({
  icon,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isIconOnly = false,
  className,
  btnType,
  ...props
}) => {
  const baseStyles =
    'flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 focus:ring-blue-300',
    danger:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800 focus:ring-red-300',
    outline:
      'border border-gray-300 text-gray-800 hover:bg-gray-100 active:bg-gray-200 dark:border-gray-500 dark:text-black dark:hover:text-white dark:hover:bg-gray-700 dark:active:bg-gray-600 focus:ring-gray-400',
  };

  const sizeStyles = {
    sm: isIconOnly ? 'p-2' : 'px-2 py-1 text-sm',
    md: isIconOnly ? 'p-3' : 'px-4 py-2 text-base',
    lg: isIconOnly ? 'p-4' : 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={btnType}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isIconOnly ? 'rounded-full' : 'rounded-md',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : icon}
      {children}
    </button>
  );
};

export default CustomButton;
