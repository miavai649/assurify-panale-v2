import {
  ConfigProvider,
  Input,
  InputRef,
  Modal,
  Space,
  TableColumnsType,
  TableColumnType,
} from 'antd';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { DiamondPlus, Eye, Trash } from 'lucide-react';
import Highlighter from 'react-highlight-words';
import toast from 'react-hot-toast';
import CustomButton from '../../components/CustomButton';
import CustomTable from '../../components/Tables/CustomTable';
import CreateThemeDataForm from '../../components/form/ThemeDataForm';
import CustomModal from '../../components/modal';
import { useColorModeContext } from '../../context/ColorModeContext';
import useQuery from '../../hooks/useQuery';
const { confirm } = Modal;

// type declaration
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  theme: string;
}

const ThemeData = () => {
  // local states
  const [addNewThemeModal, setAddNewThemeModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  // const [refetch, setRefetch] = useState(true);

  const searchInput = useRef<InputRef>(null);

  const token = localStorage.getItem('accessToken');

  // query and mutation
  const { data: themeData, isLoading } = useQuery<{ rows: DataType[] }>(
    '/api/admin/get-selectors',
  );
  console.log('👀 ~ ThemeData ~ themesData:', { themeData, isLoading });

  // useEffect(() => {
  //   fetch('https://origin.assurify.app/api/admin/get-selectors', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setThemeData(data?.rows);
  //       setLoading(false);
  //     });
  // }, [refetch]);

  // theme data delete confirmation modal
  const showPromiseConfirm = (id: string) => {
    confirm({
      title: 'Are you sure you want to delete this theme?',
      icon: <ExclamationCircleFilled />,
      content:
        'Deleting this theme will remove all associated selectors and cannot be undone. Do you want to proceed?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const response = await fetch(
            `https://origin.assurify.app/api/admin/selectors/delete/${id}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();
          if (data?.success) {
            toast.success('Theme data deleted successfully');
          } else {
            console.log(data);
            toast.error('Something Went Wrong');
          }
        } catch (error) {
          console.log(error);
          toast.error('Something Went Wrong');
        }
      },
      onCancel() {
        console.log('Theme deletion canceled.');
      },
    });
  };

  // search by theme name in the table functionality start
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
      <SearchOutlined
        style={{ color: filtered ? '#3C50E0' : '#3C50E0', fontSize: 20 }}
      />
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
  // search by theme name in the table functionality end

  // theme data table columns
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
            onClick={() => showPromiseConfirm(key)}
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

  const data = themeData?.rows?.map((data: any) => {
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
          data={data || []}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default ThemeData;
