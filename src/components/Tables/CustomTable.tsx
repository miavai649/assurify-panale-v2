import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import { ReactNode } from 'react';

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
  return (
    <Table<T>
      bordered
      size={tableSize}
      title={() => tableTitle}
      pagination={{ position: ['bottomCenter'], pageSize: 5 }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default CustomTable;
