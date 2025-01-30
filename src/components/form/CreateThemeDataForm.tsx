import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import CustomButton from '../CustomButton';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

const CreateThemeDataForm = () => (
  <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    className=" mx-auto pt-5"
    autoComplete="on"
    initialValues={{ users: [{}] }}
    layout="vertical"
  >
    {/* Theme Input Field */}
    <Form.Item
      name="theme"
      label="Theme"
      // rules={[{ required: true, message: 'Theme is required' }]}
    >
      <Input placeholder="Enter theme" />
    </Form.Item>

    {/* Dynamic Form List */}
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <div key={key} className="flex  gap-4 w-full">
              <Form.Item
                {...restField}
                name={[name, 'first']}
                label="Mutate Data"
                className="w-full sm:w-1/3"
              >
                <Input
                  prefix={<p>Cart</p>}
                  placeholder=".cart__ctas, cart__summary"
                />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'last1']}
                label="*"
                className="w-full sm:w-1/3"
              >
                <Input
                  prefix={<p>Subtotal</p>}
                  placeholder="totals__total-value"
                />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'last2']}
                label="*"
                className="w-full sm:w-1/3"
              >
                <Input
                  prefix={<p>Checkout</p>}
                  placeholder=".cart__ctas .cart__checkout-button"
                />
              </Form.Item>

              {/* Remove Button */}
              {fields.length > 1 && (
                <MinusCircleOutlined
                  onClick={() => remove(name)}
                  className="text-red-500 cursor-pointer mt-4 sm:mt-2"
                />
              )}
            </div>
          ))}

          {/* Add Field and Submit Buttons */}
          <Form.Item>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
              <CustomButton
                variant="outline"
                onClick={() => add()}
                className="w-full sm:w-auto"
              >
                <PlusOutlined /> Add Field
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

export default CreateThemeDataForm;
