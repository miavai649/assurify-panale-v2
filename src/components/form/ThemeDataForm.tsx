import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import CustomButton from '../CustomButton';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

interface ICreateThemeDataForm {
  isModal?: boolean;
  defaultData?: {
    themeName?: string;
    selector?: { cart: string; subTotal: string; checkOut: string }[];
  };
}

const CreateThemeDataForm = ({
  isModal = false,
  defaultData,
}: ICreateThemeDataForm) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (defaultData?.selector) {
      form.setFieldsValue({
        theme: defaultData.themeName || '',
        selector: defaultData.selector.map((item) => ({
          cart: item.cart || '',
          subtotal: item.subTotal || '',
          checkout: item.checkOut || '',
        })),
      });
    }
  }, [defaultData, form]);

  return (
    <Form
      form={form}
      name="create_theme_data"
      onFinish={onFinish}
      className="mx-auto pt-5"
      autoComplete="on"
      initialValues={{ selector: [{}] }}
      layout="vertical"
    >
      <Form.Item name="theme" label="Theme">
        <Input placeholder="Enter theme" />
      </Form.Item>

      <Form.List name="selector">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="flex gap-4 w-full">
                <Form.Item
                  {...restField}
                  name={[name, 'cart']}
                  label="Mutate Data (Cart)"
                  className="w-full sm:w-1/3"
                >
                  <Input placeholder=".cart__ctas, cart__summary" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'subtotal']}
                  label="Subtotal"
                  className="w-full sm:w-1/3"
                >
                  <Input placeholder="totals__total-value" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'checkout']}
                  label="Checkout"
                  className="w-full sm:w-1/3"
                >
                  <Input placeholder=".cart__ctas .cart__checkout-button" />
                </Form.Item>

                {fields.length > 1 && (
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    className="text-[#FB5454] cursor-pointer mt-4 sm:mt-2"
                  />
                )}
              </div>
            ))}

            <Form.Item>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
                <CustomButton
                  variant="outline"
                  onClick={() => add()}
                  className="w-full sm:w-auto"
                >
                  <PlusOutlined
                    className={`${!isModal && 'dark:text-white'}`}
                  />{' '}
                  <span className={`${!isModal && 'dark:text-white'}`}>
                    Add Field
                  </span>
                </CustomButton>

                <CustomButton type="submit" className="w-full sm:w-auto">
                  Submit
                </CustomButton>
              </div>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default CreateThemeDataForm;
