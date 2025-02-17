import { Tag } from 'antd';
import React from 'react';

interface CustomStatusTagProps {
  label: string;
  icon?: React.ReactNode;
  color: string;
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
