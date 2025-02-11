import { ChangeEvent, ReactNode } from 'react';
import SvgIcon from '../Svg';

interface InputFieldProps {
  label?: string;
  type: string;
  placeholder: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  labelContent?: ReactNode;
  isDisabled?: boolean;
}

const CustomInputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  icon,
  size = 'md',
  className = '',
  value,
  onChange,
  name,
  labelContent,
  isDisabled = false,
}) => {
  const sizeClasses = {
    sm: 'py-2 pl-4 pr-8 text-sm',
    md: 'py-4 pl-6 pr-10 text-base',
    lg: 'py-5 pl-8 pr-12 text-lg',
  };

  return (
    <div className={`${className}`}>
      {labelContent ? (
        <>{labelContent}</>
      ) : (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          disabled={isDisabled}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border border-stroke bg-transparent outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${sizeClasses[size]}`}
        />
        {icon && (
          <span className="absolute right-4 top-4">
            <SvgIcon name={icon} />
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomInputField;
