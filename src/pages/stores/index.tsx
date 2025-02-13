import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import CustomStatusTag from '../../components/CustomStatusTag';
import CustomTable from '../../components/Tables/CustomTable';
import { formatDate } from '../../lib/formatDate';
import { shopifyStores } from './storesDummyData';

// Define a type for the status mapping keys
type Status = 'installed' | 'uninstalled';

const Stores = () => {
  const statusMapping: Record<
    Status,
    { label: string; icon: JSX.Element; color: string }
  > = {
    installed: {
      label: 'Installed',
      icon: <CheckCircleOutlined />,
      color: 'success',
    },
    uninstalled: {
      label: 'Uninstalled',
      icon: <CloseCircleOutlined />,
      color: 'error',
    },
  };

  // promotions table column
  const columns: TableColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Store Name',
      dataIndex: 'storeName',
    },
    {
      title: 'Current Plan',
      dataIndex: 'currentPlan',
    },
    {
      title: 'App Status',
      dataIndex: 'appStatus',
      render: (appStatus: Status) => {
        return (
          <CustomStatusTag
            label={statusMapping[appStatus]?.label}
            icon={statusMapping[appStatus]?.icon}
            color={statusMapping[appStatus]?.color}
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
      render: (key) => (
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

  return (
    <div>
      <Breadcrumb pageName="Installation Request" />

      <CustomTable columns={columns} tableSize="large" data={shopifyStores} />
    </div>
  );
};

export default Stores;
