import { TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomTable from '../../components/Tables/CustomTable';
import CustomButton from '../../components/CustomButton';
import { DownloadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const Promotions = () => {
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [plan, setPlan] = useState([]);
  const token = localStorage.getItem('accessToken');

  // promotions table column
  const columns: TableColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Key',
      dataIndex: 'Key',
    },
    {
      title: 'PlanID',
      dataIndex: 'planId',
    },
    {
      title: 'Used At',
      dataIndex: 'usedAt',
      render: (usedAt: string) => <p>{usedAt ? 'Used' : 'Not Used'}</p>,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: (updatedAt: string) =>
        new Date(updatedAt).toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
  ];

  // fetching promotions data
  useEffect(() => {
    fetch('https://origin.assurify.app/api/admin/promotions/get-all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
        setLoading(false);
      });
  }, []);

  // fetching plans data
  useEffect(() => {
    fetch('https://origin.assurify.app/api/admin/plans', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlan(data);
        setLoading(false);
      });
  }, []);

  // configuring data for showing in the table
  const data = promotions?.map((promotion: any) => {
    return {
      key: promotion?.id,
      id: promotion?.id,
      Key: promotion?.key,
      planId: promotion?.planId,
      usedAt: promotion?.usedAt,
      updatedAt: promotion?.updatedAt,
    };
  });

  // download csv file function
  const downloadCsv = () => {
    const keys: string[] = [];

    promotions.forEach((promotion: any) => {
      keys.push(promotion.key);
    });

    if (keys.length == 0) return toast.error('No keys found!');

    const csv = keys.join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'promotions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <Breadcrumb pageName="Promotions" />

      <CustomButton onClick={downloadCsv} className="mb-3">
        <DownloadOutlined /> <span>Download CSV</span>
      </CustomButton>

      <CustomTable
        tableTitle={`Total ${data?.length} keys`}
        columns={columns}
        tableSize="large"
        data={data}
        loading={loading}
      />
    </div>
  );
};

export default Promotions;
