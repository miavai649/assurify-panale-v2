import { ConfigProvider, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useColorModeContext } from '../../context/ColorModeContext';
import CreateThemeDataForm from '../../components/form/ThemeDataForm';

const SingleThemeData = () => {
  const [themeData, setThemeData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { state } = useColorModeContext();
  const { colorMode } = state;

  useEffect(() => {
    setLoading(true);
    fetch(`https://origin.assurify.app/api/admin/selectors/view/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhc3N1cmlmeS5hcHAiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3Mzg1NTkwNTksImV4cCI6MTczODY0NTQ1OX0.tyUSQKEuoNuin8UTbtw5XQLse2LpPo2y_tUuuBghswY`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setThemeData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
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
      <CreateThemeDataForm defaultData={themeData} />
    </ConfigProvider>
  );
};

export default SingleThemeData;
