import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import CustomStatusTag from '../../components/CustomStatusTag';
import CustomTable from '../../components/Tables/CustomTable';
import useQuery from '../../hooks/useQuery';
import { formatDate } from '../../lib/formatDate';

// Define a type for the status mapping keys
type Status = 'installed' | 'uninstalled';

const Stores = () => {
  // query and mutation
  const { data: stores, isLoading } = useQuery<any[]>(
    '/api/admin/stores/get-all',
  ); // get all stores

  // stores table column
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
      title: 'Current Plan',
      dataIndex: 'currentPlan',
      render: (currentPlan: string) => currentPlan || 'Free Plan',
    },
    {
      title: 'App Status',
      dataIndex: 'appStatus',
      render: (appStatus: Status) => {
        return (
          <CustomStatusTag
            label={appStatus ? 'Uninstalled' : 'Installed'}
            icon={appStatus ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
            color={appStatus ? 'error' : 'success'}
          />
        );
      },
      filters: [
        {
          text: 'Installed',
          value: 'installed',
        },
        {
          text: 'Uninstalled',
          value: 'uninstalled',
        },
      ],
      onFilter: (value, record) => {
        return record.appStatus === value;
      },
    },
    {
      title: 'Installed At',
      dataIndex: 'installedAt',
      render: (installedAt: string) => formatDate(installedAt),
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      key: 'view',
      render: () => (
        <NavLink to={`/stores/view/1`}>
          <CustomButton
            icon={<Eye className="w-4 h-4" />}
            aria-label="View"
            variant="primary"
            isIconOnly
            size="sm"
          />
        </NavLink>
      ),
    },
  ];

  // configuring data for showing in the table
  const tableData =
    stores?.map((store: any) => {
      return {
        key: store?.id,
        id: store?.id,
        name: store?.owner_name,
        email: store?.email,
        currentPlan: store?.active_plan,
        appStatus: store?.uninstalled,
        installedAt: store?.created_at,
      };
    }) || [];

  return (
    <div>
      <Breadcrumb pageName="Stores" />

      <CustomTable
        columns={columns}
        tableSize="large"
        data={tableData}
        loading={isLoading}
      />
    </div>
  );
};

export default Stores;
