import { ConfigProvider, Table, TableColumnsType } from 'antd';
import { ReactNode } from 'react';
import useColorMode from '../../hooks/useColorMode';
import useLocalStorage from '../../hooks/useLocalStorage';

interface CustomTableProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  tableTitle: ReactNode;
  tableSize: 'small' | 'middle' | 'large';
}

const CustomTable = <T extends object>({
  columns,
  data,
  tableTitle,
  tableSize,
}: CustomTableProps<T>) => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');
  console.log('🚀 ~ colorMode:', colorMode);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#56A7DC',
          colorBgContainer: '#fff',
          colorText: 'var(--tw-text-black)',
          borderRadius: 6,
        },
      }}
    >
      <div className="rounded-lg border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table<T>
          bordered
          size={tableSize}
          title={() => (
            <div className="text-title-md font-bold text-black dark:text-white">
              {tableTitle}
            </div>
          )}
          pagination={{ position: ['bottomCenter'], pageSize: 5 }}
          columns={columns}
          dataSource={data}
          className="dark:bg-boxdark"
        />
      </div>
    </ConfigProvider>
  );
};

export default CustomTable;
