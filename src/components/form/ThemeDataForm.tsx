import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton';
import CustomInputField from './CustomInputField';

interface ISelector {
  cart: string;
  subTotal: string;
  checkOut: string;
}

interface ICreateThemeDataForm {
  defaultData?: {
    themeName?: string;
    selector?: ISelector[];
  };
}

const CreateThemeDataForm = ({ defaultData }: ICreateThemeDataForm) => {
  //  initial form state
  const initialFormState = {
    theme: defaultData?.themeName || '',
    selector: defaultData?.selector || [
      { cart: '', subTotal: '', checkOut: '' },
    ],
  };

  // form state
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (defaultData?.selector) {
      setForm({
        theme: defaultData.themeName || '',
        selector: defaultData.selector.map((item) => ({
          cart: item.cart || '',
          subTotal: item.subTotal || '',
          checkOut: item.checkOut || '',
        })),
      });
    }
  }, [defaultData]);

  const handleInputChange = (
    index: number,
    field: keyof ISelector,
    value: string,
  ) => {
    const updatedSelector = form.selector.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    setForm({ ...form, selector: updatedSelector });
  };

  // add a new field
  const handleAddField = () => {
    setForm({
      ...form,
      selector: [...form.selector, { cart: '', subTotal: '', checkOut: '' }],
    });
  };

  // remove a field
  const handleRemoveField = (index: number) => {
    const updatedSelector = form.selector.filter((_, i) => i !== index);
    setForm({ ...form, selector: updatedSelector });
  };

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', form);

    setForm(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto pt-5">
      <div className="mb-4">
        <CustomInputField
          label="Theme"
          type="text"
          size="sm"
          placeholder="Enter theme"
          value={form.theme}
          onChange={(e) => setForm({ ...form, theme: e.target.value })}
        />
      </div>

      {form.selector.map((item, index) => (
        <div key={index} className="flex gap-4 w-full mb-4">
          <div className="w-full sm:w-1/3">
            <CustomInputField
              label="Mutate Data (Cart)"
              type="text"
              size="sm"
              placeholder=".cart__ctas, cart__summary"
              value={item.cart}
              onChange={(e) => handleInputChange(index, 'cart', e.target.value)}
            />
          </div>

          <div className="w-full sm:w-1/3">
            <CustomInputField
              label="Subtotal"
              type="text"
              size="sm"
              placeholder="totals__total-value"
              value={item.subTotal}
              onChange={(e) =>
                handleInputChange(index, 'subTotal', e.target.value)
              }
            />
          </div>

          <div className="w-full sm:w-1/3">
            <CustomInputField
              label="Checkout"
              type="text"
              size="sm"
              placeholder=".cart__ctas .cart__checkout-button"
              value={item.checkOut}
              onChange={(e) =>
                handleInputChange(index, 'checkOut', e.target.value)
              }
            />
          </div>

          {form.selector.length > 1 && (
            <MinusCircleOutlined
              onClick={() => handleRemoveField(index)}
              className="text-[#FB5454] cursor-pointer mt-4 sm:mt-2"
            />
          )}
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
        <CustomButton
          variant="outline"
          onClick={handleAddField}
          className="w-full sm:w-auto"
        >
          <PlusOutlined className="text-black dark:text-white" />{' '}
          <span className="text-black dark:text-white">Add Field</span>
        </CustomButton>

        <CustomButton type="submit" className="w-full sm:w-auto">
          Submit
        </CustomButton>
      </div>
    </form>
  );
};

export default CreateThemeDataForm;
