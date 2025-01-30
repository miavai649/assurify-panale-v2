import { TableColumnsType, Tag } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import CustomTable from '../../components/Tables/CustomTable';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Eye } from 'lucide-react';
import CustomButton from '../../components/CustomButton';

export const InstallationRequest = () => {
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(true);

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
        return (
          <>
            {status === 'pending' ? (
              <Tag icon={<ClockCircleOutlined />} color="default">
                Pending
              </Tag>
            ) : status === 'in_progress' ? (
              <Tag icon={<SyncOutlined spin />} color="processing">
                In Progress
              </Tag>
            ) : status === 'resolved' ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Resolved
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Cancelled
              </Tag>
            )}
          </>
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

  useEffect(() => {
    fetch('https://origin.assurify.app/api/admin/supports/get-all', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhc3N1cmlmeS5hcHAiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MzgxNDIzOTIsImV4cCI6MTczODIyODc5Mn0.iMx3p-0JLnmUlgW30tJ8AS8MwzQjigBXYBDnKgm0i9k`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSupports(data?.rows);
        setLoading(false);
      });
  }, []);

  const data = supports?.map((support: any) => {
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
        data={data}
        loading={loading}
      />
    </div>
  );
};
