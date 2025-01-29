import { ConfigProvider, Table, TableColumnsType } from 'antd';
import { ReactNode } from 'react';
import { useColorModeContext } from '../../context/ColorModeContext';

interface CustomTableProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  tableTitle?: ReactNode;
  tableSize: 'small' | 'middle' | 'large';
  loading?: boolean;
}

const CustomTable = <T extends object>({
  columns,
  data,
  tableTitle,
  tableSize,
  loading,
}: CustomTableProps<T>) => {
  const { state } = useColorModeContext();
  const { colorMode } = state;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#56A7DC',
          colorBgContainer: colorMode === 'light' ? '#fff' : '#24303F',
          colorText: 'var(--tw-text-black)',
          borderRadius: 6,
        },
      }}
    >
      <div className="rounded-lg border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table<T>
          bordered
          size={tableSize}
          loading={loading}
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
