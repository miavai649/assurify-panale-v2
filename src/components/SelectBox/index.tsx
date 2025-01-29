import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
}) => {
  const [selected, setSelected] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option.value);
  };

  return (
    <div className="relative w-1/3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 shadow-sm"
      >
        {selected ? selected.label : placeholder}
        <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleSelect(option)}
            >
              {option.label}
              {selected?.value === option.value && (
                <Check size={16} className="text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
