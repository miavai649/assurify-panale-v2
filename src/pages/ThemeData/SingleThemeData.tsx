import { ConfigProvider } from 'antd';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import CreateThemeDataForm from '../../components/form/ThemeDataForm';
import { useColorModeContext } from '../../context/ColorModeContext';
import useQuery from '../../hooks/useQuery';

const SingleThemeData = () => {
  // local state
  const { id } = useParams();
  const { state } = useColorModeContext();
  const { colorMode } = state;

  const {
    data: themeData,

    isLoading,
  } = useQuery<{ themeName?: string; selector?: any }>(
    `/api/admin/selectors/view/${id}`,
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
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
      <CreateThemeDataForm defaultData={themeData} id={id} />
    </ConfigProvider>
  );
};

export default SingleThemeData;
