import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button, TableColumnsType } from 'antd';
import { NavLink } from 'react-router-dom';

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const ThemeData = () => {
  const [themeData, setThemeData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      key: 'view',
      render: (key) => (
        <>
          <NavLink to={`/installation-request/view/${key}`}>
            <Button shape="circle" icon={<EyeOutlined />} />
          </NavLink>
          <Button shape="circle" icon={<DeleteOutlined />} />
        </>
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
        // setThemeData(data?.rows);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Breadcrumb pageName="Theme Data" />
    </div>
  );
};

export default ThemeData;
