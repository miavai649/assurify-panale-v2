import { TableColumnsType } from 'antd';
import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import CustomStatusTag from '../../components/CustomStatusTag';
import CustomInputField from '../../components/form/CustomInputField';
import SelectBox from '../../components/SelectBox';
import CustomTable from '../../components/Tables/CustomTable';
import { formatDate } from '../../lib/formatDate';
import useQuery from '../../hooks/useQuery';

type Role = 'admin' | 'super_admin' | 'member';

const User = () => {
  // local state
  const [role, setRole] = useState('');
  console.log('👀 ~ User ~ role:', role);

  const { data: usersData, isLoading } = useQuery<any[]>(
    '/api/admin/users/get-all',
  );
  console.log('👀 ~ User ~ usersData:', usersData);

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
      render: () => (
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

  // configuring data for showing in the table
  const tableData =
    usersData?.map((user: any) => {
      return {
        key: user?.id,
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        createdAt: user?.createdAt,
      };
    }) || [];

  return (
    <div>
      <Breadcrumb pageName="Users" />

      {/* sending invitation for new user  */}
      <div className="mb-6 h-full grid grid-cols-12 gap-4 items-center justify-center">
        <CustomInputField
          className="col-span-10 mb-2 "
          placeholder="Email"
          size="md"
          // onChange={(e) => setCount(e.target.value)}
          type="email"
        />
        <CustomButton
          size="md"
          // onClick={generateKeys}
          // isLoading={isPending}
          className="col-span-2 "
        >
          Send Invite
        </CustomButton>
      </div>

      <CustomTable
        loading={isLoading}
        columns={columns}
        tableSize="large"
        data={tableData}
      />
    </div>
  );
};

export default User;
