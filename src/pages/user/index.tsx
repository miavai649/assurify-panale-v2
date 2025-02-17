import { TableColumnsType } from 'antd';
import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomStatusTag from '../../components/CustomStatusTag';
import SelectBox from '../../components/SelectBox';
import CustomTable from '../../components/Tables/CustomTable';
import { formatDate } from '../../lib/formatDate';
import { userDummyData } from './userDummyData';

type Role = 'admin' | 'super_admin' | 'member';

const User = () => {
  // local state
  const [role, setRole] = useState('');

  const options = [
    { value: 'member', label: 'Member' },
    { value: 'admin', label: 'Admin' },
    { value: 'super_admin', label: 'Super Admin' },
  ];

  const roleMapping: Record<Role, { label: string; color: string }> = {
    admin: {
      label: 'Admin',
      color: '#3B82F6',
    },
    super_admin: {
      label: 'Super Admin',
      color: '#10B981',
    },
    member: {
      label: 'Member',
      color: '#6B7280',
    },
  };

  // users data table column
  const columns: TableColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (appStatus: Role) => {
        return (
          <CustomStatusTag
            label={roleMapping[appStatus]?.label}
            color={roleMapping[appStatus]?.color}
          />
        );
      },
      filters: [
        {
          text: 'Admin',
          value: 'admin',
        },
        {
          text: 'Super Admin',
          value: 'super_admin',
        },
        {
          text: 'Member',
          value: 'member',
        },
      ],
      onFilter: (value, record) => {
        return record.appStatus === value;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      key: 'view',
      render: (key) => (
        <SelectBox
          options={options}
          // defaultValue={options.find(
          //   (options) => options.value === singleSupportRequestData?.status,
          // )}
          placeholder="Update role"
          onChange={(value) => setRole(value as string)}
        />
      ),
    },
  ];
  return (
    <div>
      <Breadcrumb pageName="Stores" />

      <CustomTable columns={columns} tableSize="large" data={userDummyData} />
    </div>
  );
};

export default User;
