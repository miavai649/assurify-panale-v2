import { DownloadOutlined } from '@ant-design/icons';
import { TableColumnsType } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import SelectBox from '../../components/SelectBox';
import CustomTable from '../../components/Tables/CustomTable';
import CustomInputField from '../../components/form/CustomInputField';
import useQuery from '../../hooks/useQuery';

interface Promotions {
  id: number;
  key: string;
  planId: number;
  usedAt: Date;
  updatedAt: Date;
}

const Promotions = () => {
  // local state
  const [planId, setPlanId] = useState<number | string>('');
  const [count, setCount] = useState<number | string>('');
  const [loading, setLoading] = useState(true);

  const [plans, setPlans] = useState<
    { id: number; name: string; price: number }[]
  >([]);
  const [promotions, setPromotions] = useState<Promotions[]>([]);
  console.log('👀 ~ Promotions ~ promotions:', promotions);
  const token = localStorage.getItem('accessToken');

  // query and mutation
  const { data, isLoading, refetch } = useQuery(
    '/api/admin/promotions/get-all',
  );
  console.log('👀 ~ Promotions ~ data:', data);

  useEffect(() => {
    const fetchData = async () => {
      setPromotions(
        (data as Promotions[])?.map((promotion) => ({
          ...promotion,
          updatedAt: new Date(promotion?.updatedAt),
        })),
      );
    };
    fetchData();
  }, [data]);

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
      render: (usedAt: string) => {
        return usedAt ? (
          <p>
            {new Date(usedAt).toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        ) : (
          <p>Not Used</p>
        );
      },
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
  const tableData = promotions?.map((promotion: any) => {
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
    formData.append('plan_id', planId.toString());
    formData.append('count', count.toString());

    try {
      const response = await fetch(
        'https://origin.assurify.app/api/admin/promotions/generate',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      console.log('👀 ~ generateKeys ~ data:', data);
    } catch (error) {
      console.log(error);
    }

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
        tableTitle={`Total ${tableData?.length} keys`}
        columns={columns}
        tableSize="large"
        data={tableData}
        loading={isLoading}
      />
    </div>
  );
};

export default Promotions;
