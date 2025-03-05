import { Button, Card, Select, message } from 'antd';
import { useState, ReactElement } from 'react';
import useMutation from '../../hooks/useMutation';
import toast from 'react-hot-toast';

const { Option } = Select;

// Define OnboardSteps type
interface OnboardSteps {
  insuranceCreated: boolean;
  insuranceCreating: boolean;
  insuranceError: string | null;
  extensionCreating: boolean;
  extensionCreated: boolean;
  extensionError: string | null;
  checkoutExtensionCreating: boolean;
  checkoutExtensionCreated: boolean;
  checkoutExtensionError: string | null;
  claimPageCreated: boolean;
  claimPageCreating: boolean;
  claimPageError: string | null;
}

interface OnboardStepsCardProps {
  storeId: number;
  onboardSteps: OnboardSteps; // Parsed object from parent
  onUpdateSuccess?: () => void; // Optional callback to refetch data
}

const OnboardStepsCard = ({
  storeId,
  onboardSteps,
  onUpdateSuccess,
}: OnboardStepsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<OnboardSteps>(onboardSteps);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) setFormState(onboardSteps); // Reset to prop value when entering edit mode
  };

  const { mutateAsync: updateOnboardSteps } = useMutation(
    `/api/admin/stores/updateStore/${storeId}`,
  );

  const handleUpdate = async () => {
    const formData = new FormData();
    // Stringify the plain object for the server
    const jsonString = JSON.stringify(formState);
    formData.append('onboard_steps', jsonString);

    console.log(formData.get('onboard_steps'));

    await updateOnboardSteps(formData);
    toast.success('Successfully updated onboard steps');
    setIsEditing(false);
    if (onUpdateSuccess) onUpdateSuccess();
  };

  const handleChange = (key: keyof OnboardSteps, value: boolean) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const renderOnboardSteps = (steps: OnboardSteps): ReactElement => {
    const getStepStatus = (
      created: boolean,
      creating: boolean,
      error: string | null,
    ): string | ReactElement => {
      if (error) {
        return <span className="text-red-500 font-medium">Error: {error}</span>;
      }
      return created ? (
        <span className="text-green-500 font-medium">Created</span>
      ) : creating ? (
        <span className="text-yellow-500 font-medium">Creating</span>
      ) : (
        <span className="text-gray-500">Pending</span>
      );
    };

    return (
      <div>
        {/* Display Mode */}
        {!isEditing && (
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Insurance
              </span>
              <span>
                {getStepStatus(
                  steps.insuranceCreated,
                  steps.insuranceCreating,
                  steps.insuranceError,
                )}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Extension
              </span>
              <span>
                {getStepStatus(
                  steps.extensionCreated,
                  steps.extensionCreating,
                  steps.extensionError,
                )}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Checkout Extension
              </span>
              <span>
                {getStepStatus(
                  steps.checkoutExtensionCreated,
                  steps.checkoutExtensionCreating,
                  steps.checkoutExtensionError,
                )}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Claim Page
              </span>
              <span>
                {getStepStatus(
                  steps.claimPageCreated,
                  steps.claimPageCreating,
                  steps.claimPageError,
                )}
              </span>
            </li>
          </ul>
        )}

        {/* Edit Mode - Form */}
        {isEditing && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Insurance
              </span>
              <div className="flex gap-2">
                <Select
                  value={
                    steps.insuranceCreated
                      ? 'created'
                      : steps.insuranceCreating
                      ? 'creating'
                      : 'pending'
                  }
                  onChange={(value) => {
                    handleChange('insuranceCreated', value === 'created');
                    handleChange('insuranceCreating', value === 'creating');
                  }}
                  className="w-28"
                >
                  <Option value="pending">Pending</Option>
                  <Option value="creating">Creating</Option>
                  <Option value="created">Created</Option>
                </Select>
                {steps.insuranceError && (
                  <span className="text-red-500 font-medium">
                    Error: {steps.insuranceError}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Extension
              </span>
              <div className="flex gap-2">
                <Select
                  value={
                    steps.extensionCreated
                      ? 'created'
                      : steps.extensionCreating
                      ? 'creating'
                      : 'pending'
                  }
                  onChange={(value) => {
                    handleChange('extensionCreated', value === 'created');
                    handleChange('extensionCreating', value === 'creating');
                  }}
                  className="w-28"
                >
                  <Option value="pending">Pending</Option>
                  <Option value="creating">Creating</Option>
                  <Option value="created">Created</Option>
                </Select>
                {steps.extensionError && (
                  <span className="text-red-500 font-medium">
                    Error: {steps.extensionError}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Checkout Extension
              </span>
              <div className="flex gap-2">
                <Select
                  value={
                    steps.checkoutExtensionCreated
                      ? 'created'
                      : steps.checkoutExtensionCreating
                      ? 'creating'
                      : 'pending'
                  }
                  onChange={(value) => {
                    handleChange(
                      'checkoutExtensionCreated',
                      value === 'created',
                    );
                    handleChange(
                      'checkoutExtensionCreating',
                      value === 'creating',
                    );
                  }}
                  className="w-28"
                >
                  <Option value="pending">Pending</Option>
                  <Option value="creating">Creating</Option>
                  <Option value="created">Created</Option>
                </Select>
                {steps.checkoutExtensionError && (
                  <span className="text-red-500 font-medium">
                    Error: {steps.checkoutExtensionError}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">
                Claim Page
              </span>
              <div className="flex gap-2">
                <Select
                  value={
                    steps.claimPageCreated
                      ? 'created'
                      : steps.claimPageCreating
                      ? 'creating'
                      : 'pending'
                  }
                  onChange={(value) => {
                    handleChange('claimPageCreated', value === 'created');
                    handleChange('claimPageCreating', value === 'creating');
                  }}
                  className="w-28"
                >
                  <Option value="pending">Pending</Option>
                  <Option value="creating">Creating</Option>
                  <Option value="created">Created</Option>
                </Select>
                {steps.claimPageError && (
                  <span className="text-red-500 font-medium">
                    Error: {steps.claimPageError}
                  </span>
                )}
              </div>
            </div>
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
          Onboard Steps
        </h2>
      }
      extra={
        <Button type="primary" onClick={handleToggleEdit}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      }
    >
      {renderOnboardSteps(formState)}
      {isEditing && (
        <Button type="primary" className="mt-4" onClick={handleUpdate}>
          Save Changes
        </Button>
      )}
    </Card>
  );
};

export default OnboardStepsCard;
