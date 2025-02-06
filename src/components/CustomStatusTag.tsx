import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const CustomStatusTag = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return (
        <Tag icon={<ClockCircleOutlined />} color="purple">
          Pending
        </Tag>
      );
    case 'in_progress':
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          In Progress
        </Tag>
      );
    case 'resolved':
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Resolved
        </Tag>
      );
    case 'cancelled':
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Cancelled
        </Tag>
      );
    case 'open':
      return (
        <Tag icon={<ClockCircleOutlined />} color="purple">
          Pending
        </Tag>
      );
    default:
      return (
        <Tag icon={<QuestionCircleOutlined />} color="warning">
          Unknown
        </Tag>
      );
  }
};

export default CustomStatusTag;
