import { Card } from 'antd';
import { useState, ReactElement } from 'react';
import useMutation from '../../hooks/useMutation';
import toast from 'react-hot-toast';
import { formatDate } from '../../lib/formatDate'; // Adjust path as needed
import CustomButton from '../../components/CustomButton';

interface Configs {
  id: number | null;
  storeId: string | null;
  key: string; // Always "custom_css"
  value: string; // Always present, defaults to ""
  json: any | null;
  createdAt: string | null;
  updatedAt: string | null;
  store_id: string | null;
}

interface ConfigsCardProps {
  storeId: number;
  configs: Configs; // Always present, no null/undefined
  onUpdateSuccess?: () => void; // Optional callback to refetch data
}

const ConfigsCard = ({
  storeId,
  configs,
  onUpdateSuccess,
}: ConfigsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customCssValue, setCustomCssValue] = useState(configs.value);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) setCustomCssValue(configs.value); // Reset to prop value when entering edit mode
  };

  const { mutateAsync: updateConfigs } = useMutation(
    `/api/admin/stores/updateStore/${storeId}`,
  );

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('custom_css', customCssValue);

    console.log(formData.get('custom_css'));

    await updateConfigs(formData);
    toast.success('Successfully updated custom CSS');
    setIsEditing(false);
    if (onUpdateSuccess) onUpdateSuccess();
  };

  const renderConfigs = (configs: Configs): ReactElement => {
    return (
      <div className="text-sm">
        {!isEditing ? (
          <div>
            <span className="font-semibold">{configs.key}:</span>
            <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-left text-xs whitespace-pre-wrap break-words">
              {configs.value
                ? configs.value
                    .split(';')
                    .filter(Boolean)
                    .map((prop) => prop.trim())
                    .join(';\n')
                : '""'}{' '}
            </pre>
            <span className="block mt-1 text-gray-500 dark:text-gray-400">
              Updated:{' '}
              {configs.updatedAt ? formatDate(configs.updatedAt) : 'N/A'}
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <span className="font-semibold">{configs.key}:</span>
            <textarea
              value={customCssValue}
              onChange={(e) => setCustomCssValue(e.target.value)}
              placeholder="Enter custom CSS (e.g., background-color: #f0f0f0;)"
              rows={4}
              className="w-full text-xs p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="block text-gray-500 dark:text-gray-400">
              Updated:{' '}
              {configs.updatedAt ? formatDate(configs.updatedAt) : 'N/A'}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card
      className="w-full max-w-2xl p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 mx-auto mt-7"
      title={
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Configs
        </h2>
      }
      extra={
        <CustomButton variant="primary" size="sm" onClick={handleToggleEdit}>
          {isEditing ? 'Cancel' : 'Edit'}
        </CustomButton>
      }
    >
      {renderConfigs(configs)}
      {isEditing && (
        <CustomButton
          variant="primary"
          size="md"
          onClick={handleUpdate}
          className="mt-4"
        >
          Save Changes
        </CustomButton>
      )}
    </Card>
  );
};

export default ConfigsCard;
