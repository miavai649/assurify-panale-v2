import { Tag, Card, Flex, Typography } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useColorModeContext } from '../../context/ColorModeContext';
import SelectBox from '../../components/SelectBox';
import CustomButton from '../../components/CustomButton';
import Loader from '../../common/Loader';
import CustomStatusTag from '../../components/CustomStatusTag';

const { Title } = Typography;

interface SupportData {
  store?: { url: string };
  themeName?: string;
  initiatedFor?: string;
  status?: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  createdAt?: string;
}

// options available for the text editor
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

// react quill modules for configuration
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  },
};

const SingleInstallationRequest = () => {
  const [support, setSupport] = useState<SupportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [value, setValue] = useState('');
  const { state } = useColorModeContext();
  const { colorMode } = state;

  const token = localStorage.getItem('accessToken');

  const { id } = useParams();

  // dynamically fetching single installation request data
  useEffect(() => {
    fetch(`https://origin.assurify.app/api/admin/supports/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSupport(data);
        setLoading(false);
        setValue(data?.reportContent || null);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [id]);

  // submit function for report and status submit
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('reportContent', value);
    formData.append('status', status);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex-col items-center   p-4">
      {/* single installation request details card */}
      <Card
        className="w-full max-w-2xl p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 mx-auto"
        title={
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Installation Request
          </h2>
        }
      >
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Store:
            </span>
            <a
              href={`https://${support?.store?.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {support?.store?.url}
            </a>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Theme:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {support?.themeName || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Service:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {support?.initiatedFor || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Status:
            </span>
            <CustomStatusTag status={support?.status as string} />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Date:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {support?.createdAt
                ? new Date(support.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : 'N/A'}
            </span>
          </div>
        </div>
      </Card>

      {/* React quill text editor */}
      <div className="mt-6 max-w-3xl mx-auto">
        <Title level={4} className="text-black dark:text-white">
          Write a Report
        </Title>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Write your report here..."
          value={value}
          onChange={setValue}
          className={`${
            colorMode === 'dark' ? 'dark-quill' : 'light-quill'
          } text-gray-800 dark:text-white`}
        />
        <Flex justify="space-between" className="mt-4">
          <div className="w-1/3">
            <SelectBox
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
              placeholder="Select a status"
              onChange={(value) => setStatus(value as string)}
            />
          </div>
          <CustomButton onClick={handleSubmit}>Submit</CustomButton>
        </Flex>
      </div>
    </div>
  );
};

export default SingleInstallationRequest;
