import { TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomTable from '../../components/Tables/CustomTable';
import CustomButton from '../../components/CustomButton';
import { DownloadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import SelectBox from '../../components/SelectBox';
import CustomInputField from '../../components/form/CustomInputField';

const Promotions = () => {
  const [planId, setPlanId] = useState<number | string>('');
  const [count, setCount] = useState<number | string>('');
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [plans, setPlans] = useState<
    { id: number; name: string; price: number }[]
  >([]);
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
        setPlans(data);
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

  // select plan options
  const options = plans
    ?.filter((plan) => plan?.price == 0)
    .map((plan) => ({ value: plan?.id, label: plan?.name }));

  // generate key function
  const generateKeys = async () => {
    const formData = new FormData();
    console.log(planId, count);

    setCount('');
    setPlanId('');
    toast.success('Successfully created!');
  };
  return (
    <div>
      <Breadcrumb pageName="Promotions" />

      <div className="mb-6 h-full grid grid-cols-12 gap-4 items-center justify-center">
        <SelectBox
          onChange={setPlanId}
          className="col-span-6"
          options={options}
        />

        <CustomInputField
          className="col-span-4 mb-2 "
          placeholder="Enter your count"
          size="md"
          onChange={(e) => setCount(e.target.value)}
          type="number"
        />
        <CustomButton size="md" onClick={generateKeys} className="col-span-2 ">
          Generate Key
        </CustomButton>
      </div>

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
