import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import CustomButton from '../CustomButton';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

interface ICreateThemeDataForm {
  isModal?: boolean;
}

const CreateThemeDataForm = ({ isModal = false }: ICreateThemeDataForm) => (
  <Form
    name="create_theme_data"
    onFinish={onFinish}
    className="mx-auto pt-5"
    autoComplete="on"
    initialValues={{ users: [{}] }}
    layout="vertical"
  >
    <Form.Item name="theme" label="Theme">
      <Input placeholder="Enter theme" />
    </Form.Item>

    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <div key={key} className="flex gap-4 w-full">
              <Form.Item
                {...restField}
                name={[name, 'first']}
                label="Mutate Data (Cart)"
                className="w-full sm:w-1/3"
              >
                <Input placeholder=".cart__ctas, cart__summary" />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'last1']}
                label="Subtotal"
                className="w-full sm:w-1/3"
              >
                <Input placeholder="totals__total-value" />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'last2']}
                label="Checkout"
                className="w-full sm:w-1/3"
              >
                <Input placeholder=".cart__ctas .cart__checkout-button" />
              </Form.Item>

              {fields.length > 1 && (
                <MinusCircleOutlined
                  onClick={() => remove(name)}
                  className="text-red-500 cursor-pointer mt-4 sm:mt-2"
                />
              )}
            </div>
          ))}

          <Form.Item>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
              <CustomButton
                variant="outline"
                onClick={() => add()}
                className="w-full sm:w-auto "
              >
                <PlusOutlined className={`${!isModal && 'dark:text-white'}`} />{' '}
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

export default CreateThemeDataForm;
