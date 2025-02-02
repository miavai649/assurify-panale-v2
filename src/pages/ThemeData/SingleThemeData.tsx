import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useColorModeContext } from '../../context/ColorModeContext';
import CreateThemeDataForm from '../../components/form/createThemeDataForm';

const SingleThemeData = () => {
  const [themedata, setThemedata] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { state } = useColorModeContext();
  const { colorMode } = state;

  useEffect(() => {
    setLoading(true);
    fetch(`https://origin.assurify.app/api/admin/selectors/view/${id}`, {
      headers: {
        Authorization: `Bearer YOUR_TOKEN_HERE`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [id]);

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
      <CreateThemeDataForm isModal={false} />
    </ConfigProvider>
  );
};

export default SingleThemeData;
