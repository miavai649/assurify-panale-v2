import { Tag, Card, Spin } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface SupportData {
  store?: { url: string };
  themeName?: string;
  initiatedFor?: string;
  status?: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  createdAt?: string;
}

const SingleInstallationRequest = () => {
  const [support, setSupport] = useState<SupportData | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://origin.assurify.app/api/admin/supports/view/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhc3N1cmlmeS5hcHAiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MzgwNTU3MzIsImV4cCI6MTczODE0MjEzMn0.JU03JawDsGhYVasJwDywdky3gAhKD7QANvIg2oGsFx0`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSupport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex justify-center   p-4">
      <Card
        className="w-full max-w-2xl p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
        title={
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Installation Request
          </h2>
        }
      >
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Store:
            </span>
            <a
              href={`https://${support?.store?.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {support?.store?.url}
            </a>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Theme:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {support?.themeName || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Service:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {support?.initiatedFor || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Status:
            </span>
            {support?.status === 'pending' ? (
              <Tag icon={<ClockCircleOutlined />} color="default">
                Pending
              </Tag>
            ) : support?.status === 'in_progress' ? (
              <Tag icon={<SyncOutlined spin />} color="processing">
                In Progress
              </Tag>
            ) : support?.status === 'resolved' ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Resolved
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Cancelled
              </Tag>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Date:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {support?.createdAt
                ? new Date(support.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : 'N/A'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleInstallationRequest;
