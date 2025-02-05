import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { ConfigProvider, TableColumnsType } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomButton from '../../components/CustomButton';
import { Eye, Trash } from 'lucide-react';
import CustomTable from '../../components/Tables/CustomTable';
import CustomModal from '../../components/modal';
import { DiamondPlus } from 'lucide-react';
import CreateThemeDataForm from '../../components/form/ThemeDataForm';
import { useColorModeContext } from '../../context/ColorModeContext';

const ThemeData = () => {
  const [themeData, setThemeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addNewThemeModal, setAddNewThemeModal] = useState(false);
  const token = localStorage.getItem('accessToken');

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
          <NavLink to={`/theme-data/view/${key}`}>
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
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
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

  const { state } = useColorModeContext();
  const { colorMode } = state;

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
        modalContent={
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#56A7DC',
                colorBgContainer: colorMode === 'light' ? '#fff' : '#24303F',
                colorText: colorMode === 'light' ? '#000' : '#fff',
                borderRadius: 6,
              },
            }}
          >
            <CreateThemeDataForm defaultData={{}} />
          </ConfigProvider>
        }
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
