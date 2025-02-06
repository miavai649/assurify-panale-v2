import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {
  Button,
  ConfigProvider,
  Input,
  InputRef,
  Space,
  TableColumnsType,
  TableColumnType,
} from 'antd';
import { NavLink } from 'react-router-dom';

import CustomButton from '../../components/CustomButton';
import { Eye, Trash } from 'lucide-react';
import CustomTable from '../../components/Tables/CustomTable';
import CustomModal from '../../components/modal';
import { DiamondPlus } from 'lucide-react';
import CreateThemeDataForm from '../../components/form/ThemeDataForm';
import { useColorModeContext } from '../../context/ColorModeContext';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const ThemeData = () => {
  const [themeData, setThemeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addNewThemeModal, setAddNewThemeModal] = useState(false);
  const token = localStorage.getItem('accessToken');
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<InputRef>(null);

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    theme: string;
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const getColumnSearchProps = (): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search Theme`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <CustomButton
            size="sm"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
          >
            Search
          </CustomButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record['theme']
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),

    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ),
  });

  const columns: TableColumnsType<any> = [
    {
      title: 'Theme',
      dataIndex: 'theme',
      width: '15%',
      ...getColumnSearchProps(),
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
