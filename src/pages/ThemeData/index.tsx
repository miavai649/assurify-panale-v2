import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { TableColumnsType } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomButton from '../../components/CustomButton';
import { Eye, Trash } from 'lucide-react';
import CustomTable from '../../components/Tables/CustomTable';
import CustomModal from '../../components/modal';
import { DiamondPlus } from 'lucide-react';
import CreateThemeDataForm from '../../components/form/createThemeDataForm';

const ThemeData = () => {
  const [themeData, setThemeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addNewThemeModal, setAddNewThemeModal] = useState(false);

  const columns: TableColumnsType<any> = [
    {
      title: 'Theme',
      dataIndex: 'theme',
    },
    {
      title: 'Request By',
      dataIndex: '*',
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      render: (data: any) => (
        <span>{JSON.stringify(data).slice(0, 50) + '.....'}</span>
      ),
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
    {
      title: 'Actions',
      dataIndex: 'key',
      key: 'view',
      render: (key) => (
        <div className="flex gap-3">
          <NavLink to={`/installation-request/view/${key}`}>
            <CustomButton
              icon={<Eye className="w-4 h-4" />}
              aria-label="View"
              variant="primary"
              isIconOnly
              size="sm"
            />
          </NavLink>
          <CustomButton
            icon={<Trash className="w-4 h-4" />}
            aria-label="Delete"
            variant="danger"
            isIconOnly
            size="sm"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch('https://origin.assurify.app/api/admin/get-selectors', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhc3N1cmlmeS5hcHAiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3MzgxNDIzOTIsImV4cCI6MTczODIyODc5Mn0.iMx3p-0JLnmUlgW30tJ8AS8MwzQjigBXYBDnKgm0i9k`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setThemeData(data?.rows);
        setLoading(false);
      });
  }, []);

  const data = themeData?.map((data: any) => {
    return {
      key: data?.id,
      theme: data?.themeName,
      updatedBy: data?.updatedBy,
      data: data?.selector,
      updatedAt: data?.updatedAt,
    };
  });

  return (
    <div>
      <Breadcrumb pageName="Theme Data" />

      {/* add new theme data modal */}
      <CustomModal
        modalTitle="Add new theme data"
        modalResponsiveWidth={{
          xs: '95%',
          sm: '90%',
          md: '80%',
          lg: '75%',
          xl: '70%',
          xxl: '60%',
        }}
        modalState={addNewThemeModal}
        setModalState={setAddNewThemeModal}
        buttonContent={
          <>
            <DiamondPlus />
            Add New Theme
          </>
        }
        modalContent={<CreateThemeDataForm />}
      />

      {/* theme data table */}
      <div className="mt-5">
        <CustomTable
          columns={columns}
          tableSize="large"
          data={data}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ThemeData;
