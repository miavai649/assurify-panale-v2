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

export const InstallationRequest = () => {
  // fetching the installation requests data
  const { data: requestsData, isLoading } = useQuery<RequestData>(
    '/api/admin/supports/get-all',
  );

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
        return <CustomStatusTag status={status} />;
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
