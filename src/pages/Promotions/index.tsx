import { TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomTable from '../../components/Tables/CustomTable';

const Promotions = () => {
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  const columns: TableColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
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

  useEffect(() => {
    fetch('https://origin.assurify.app/api/admin/promotions/get-all', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhc3N1cmlmeS5hcHAiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3Mzg1NTkwNTksImV4cCI6MTczODY0NTQ1OX0.tyUSQKEuoNuin8UTbtw5XQLse2LpPo2y_tUuuBghswY`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
        setLoading(false);
      });
  }, []);

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

  return (
    <div>
      <Breadcrumb pageName="Promotions" />

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
