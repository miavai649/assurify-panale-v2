import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import CustomStatusTag from '../../components/CustomStatusTag';
import CustomTable from '../../components/Tables/CustomTable';
import useQuery from '../../hooks/useQuery';

interface RequestData {
  rows: Array<{
    id: string;
    store: { url: string };
    initiatedFor: string;
    status: string;
    createdAt: string;
  }>;
}

type StatusType = 'pending' | 'in_progress' | 'resolved' | 'cancelled' | 'open';

export const InstallationRequest = () => {
  // fetching the installation requests data
  const { data: requestsData, isLoading } = useQuery<RequestData>(
    '/api/admin/supports/get-all',
  );

  // installation status mapping object
  const statusMapping: Record<
    StatusType,
    { label: string; icon: JSX.Element; color: string }
  > = {
    pending: {
      label: 'Pending',
      icon: <ClockCircleOutlined />,
      color: 'purple',
    },
    in_progress: {
      label: 'In Progress',
      icon: <SyncOutlined spin />,
      color: 'processing',
    },
    resolved: {
      label: 'Resolved',
      icon: <CheckCircleOutlined />,
      color: 'success',
    },
    cancelled: {
      label: 'Cancelled',
      icon: <CloseCircleOutlined />,
      color: 'error',
    },
    open: {
      label: 'Open',
      icon: <ClockCircleOutlined />,
      color: 'purple',
    },
  };

  // installation request table column
  const columns: TableColumnsType<any> = [
    {
      title: 'Shop',
      dataIndex: 'shop',
    },
    {
      title: 'Service',
      dataIndex: 'service',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => {
        const statusDetails = statusMapping[status as StatusType];

        return (
          <CustomStatusTag
            label={statusDetails?.label}
            icon={statusDetails?.icon}
            color={statusDetails?.color}
          />
        );
      },
      filters: [
        {
          text: 'Pending',
          value: 'pending',
        },
        {
          text: 'In Progress',
          value: 'in_progress',
        },
        {
          text: 'Resolved',
          value: 'resolved',
        },
        {
          text: 'Cancelled',
          value: 'cancelled',
        },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date: string) =>
        new Date(date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
    {
      title: 'Action',
      dataIndex: 'key',
      key: 'view',
      render: (key) => (
        <NavLink to={`/installation-request/view/${key}`}>
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

  // configuring installation request data for showing them in the table
  const data = requestsData?.rows?.map((support: any) => {
    return {
      key: support?.id,
      shop: support?.store?.url,
      service: support?.initiatedFor,
      status: support?.status,
      date: support?.createdAt,
    };
  });

  return (
    <div>
      <Breadcrumb pageName="Installation Request" />

      <CustomTable
        columns={columns}
        tableSize="large"
        data={data || []}
        loading={isLoading}
      />
    </div>
  );
};
