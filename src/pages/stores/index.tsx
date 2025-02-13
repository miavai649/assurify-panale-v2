import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TableColumnsType, Tag } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomTable from '../../components/Tables/CustomTable';
import { formatDate } from '../../lib/formatDate';
import { shopifyStores } from './storesDummyData';

const Stores = () => {
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
      render: (appStatus: string) => {
        if (appStatus === 'Installed') {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Installed
            </Tag>
          );
        } else {
          return (
            <Tag icon={<CloseCircleOutlined />} color="error">
              Uninstalled
            </Tag>
          );
        }
      },
      filters: [
        {
          text: 'Installed',
          value: 'Installed',
        },
        {
          text: 'Uninstalled',
          value: 'Uninstalled',
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
  ];

  return (
    <div>
      <Breadcrumb pageName="Installation Request" />

      <CustomTable columns={columns} tableSize="large" data={shopifyStores} />
    </div>
  );
};

export default Stores;
