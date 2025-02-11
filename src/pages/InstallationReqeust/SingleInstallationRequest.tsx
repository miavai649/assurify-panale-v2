import { Card, Flex, Typography } from 'antd';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import CustomButton from '../../components/CustomButton';
import CustomStatusTag from '../../components/CustomStatusTag';
import SelectBox from '../../components/SelectBox';
import { useColorModeContext } from '../../context/ColorModeContext';
import useQuery from '../../hooks/useQuery';

const { Title } = Typography;

interface RequestData {
  store?: { url: string };
  themeName?: string;
  initiatedFor?: string;
  status?: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  createdAt?: string;
  reportContent?: string;
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [value, setValue] = useState('');

  const { id } = useParams();
  const { state } = useColorModeContext();
  const { colorMode } = state;

  const {
    data: singleSupportRequestData,
    isLoading,
    isFetched,
  } = useQuery<RequestData>(`/api/admin/supports/view/${id}`);

  const token = localStorage.getItem('accessToken');

  // submit function for report and status submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('reportContent', value);
      formData.append('status', status);

      const response = await fetch(
        `https://origin.assurify.app/api/admin/supports/update/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      const data = await response.json();

      if (data.success) {
        toast.success('Installation Request Updated Successfully');
        setLoading(false);
      } else {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Something Went Wrong');
      setLoading(false);
    }
  };

  // status options
  const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  useEffect(() => {
    if (isFetched && singleSupportRequestData) {
      setStatus(singleSupportRequestData.status || '');
      setValue(singleSupportRequestData.reportContent || '');
    }
  }, [isFetched, singleSupportRequestData]);

  if (isLoading) {
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
              href={`https://${singleSupportRequestData?.store?.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {singleSupportRequestData?.store?.url}
            </a>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Theme:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {singleSupportRequestData?.themeName || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Service:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {singleSupportRequestData?.initiatedFor || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Status:
            </span>
            <CustomStatusTag
              status={singleSupportRequestData?.status as string}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 dark:text-gray-300">
              Date:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {singleSupportRequestData?.createdAt
                ? new Date(
                    singleSupportRequestData.createdAt,
                  ).toLocaleDateString('en-US', {
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
          value={value ? value : ''}
          onChange={setValue}
          className={`${
            colorMode === 'dark' ? 'dark-quill' : 'light-quill'
          } text-gray-800 dark:text-white`}
        />
        <Flex justify="space-between" className="mt-4">
          <div className="w-1/3">
            <SelectBox
              options={options}
              defaultValue={options.find(
                (options) => options.value === singleSupportRequestData?.status,
              )}
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
