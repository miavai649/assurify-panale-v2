import { Card, Modal } from 'antd';
import { ReactElement } from 'react';
import useMutation from '../../hooks/useMutation';
import toast from 'react-hot-toast';
import { formatDate } from '../../lib/formatDate'; // Adjust path as needed
import { Trash } from 'lucide-react'; // Assuming you're using lucide-react for icons
import { ExclamationCircleFilled } from '@ant-design/icons';
import CustomButton from '../../components/CustomButton';

interface Product {
  id: number | null;
  storeId: number | null;
  productId: string | null;
  title: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  store_id: number | null;
}

interface ProductCardProps {
  storeId: number;
  product: Product | null | undefined; // Single product, can be null/undefined
  onUpdateSuccess?: () => void; // Optional callback to refetch data
}

// DeleteProductButton Component
const DeleteProductButton = ({
  storeId,
  refetch,
  productId,
}: {
  storeId: number;
  refetch: any;
  productId: string;
}) => {
  const { mutateAsync } = useMutation(
    `/api/admin/stores/updateStore/${storeId}`,
  );

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('product_id', productId); // Matches your controller's `body.get("productDelete")`

    try {
      await mutateAsync(formData);
      toast.success('Product deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Delete error:', error);
    }
  };

  const showPromiseConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      icon: <ExclamationCircleFilled />,
      content:
        'Deleting this product will remove it from the store and cannot be undone. Do you want to proceed?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: handleDelete,
      onCancel: () => {
        toast.error('Delete product cancelled');
      },
    });
  };

  return (
    <CustomButton
      onClick={showPromiseConfirm}
      icon={<Trash className="w-4 h-4" />}
      aria-label="Delete"
      variant="danger"
      isIconOnly
      size="sm"
    />
  );
};

const ProductCard = ({
  storeId,
  product,
  onUpdateSuccess,
}: ProductCardProps) => {
  const renderProduct = (product: Product | null | undefined): ReactElement => {
    if (!product?.title) {
      return (
        <span className="italic text-gray-500 dark:text-gray-400">
          No product linked
        </span>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-semibold">
            Title:
          </span>
          <span className="text-gray-800 dark:text-gray-200">
            {product.title}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-semibold">
            Created At:
          </span>
          <span className="text-gray-800 dark:text-gray-200">
            {product.createdAt ? formatDate(product.createdAt) : 'N/A'}
          </span>
        </div>
        <div className="flex justify-end">
          <DeleteProductButton
            storeId={storeId}
            refetch={onUpdateSuccess}
            productId={product.productId!!}
          />
        </div>
      </div>
    );
  };

  return (
    <Card
      className="w-full max-w-2xl p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 mx-auto mt-7"
      title={
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Product
        </h2>
      }
    >
      {renderProduct(product)}
    </Card>
  );
};

export default ProductCard;
