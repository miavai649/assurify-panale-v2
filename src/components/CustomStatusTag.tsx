import { Tag } from 'antd';
import React from 'react';

interface CustomStatusTagProps {
  label: string; // The label of the status (e.g., 'Installed', 'Uninstalled')
  icon: React.ReactNode; // The icon to display with the tag (e.g., <CheckCircleOutlined />)
  color: string; // The color of the tag (e.g., 'success', 'error', 'processing')
}

const CustomStatusTag: React.FC<CustomStatusTagProps> = ({
  label,
  icon,
  color,
}) => {
  return (
    <Tag icon={icon} color={color}>
      {label}
    </Tag>
  );
};

export default CustomStatusTag;
