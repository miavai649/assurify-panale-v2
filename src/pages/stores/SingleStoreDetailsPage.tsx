import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import CardDataStats from '../../components/CardDataStats';
import useQuery from '../../hooks/useQuery';
import { formatDate } from '../../lib/formatDate';
import OnboardStepsCard from './OnboardStepsCard';
import ConfigsCard from './ConfigsCard';

interface StoreData {
  id: number;
  onboard_steps: string | null | undefined;
  url: string;
  owner_name: string;
  active_plan: string | null;
  created_at: string;
  email: string;
  products: {
    id: number | null;
    storeId: number | null;
    productId: string | null;
    title: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    store_id: number | null;
  };
  configs: {
    id: number | null;
    storeId: string | null;
    key: string; // Always "custom_css"
    value: string; // Always present, defaults to ""
    json: any | null;
    createdAt: string | null;
    updatedAt: string | null;
    store_id: string | null;
  };
  lifetimeClaimCount: number;
  lifetimeSpent: number;
  currentMonthClaimCount: number;
  currentMonthSpent: number;
}

const SingleStoreDetailsPage = () => {
  const { id } = useParams();

  // query and mutation
  const {
    data: singleStore,
    isLoading,
    refetch, // Add refetch from useQuery
  } = useQuery<StoreData>(`/api/admin/stores/${id}`);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* life time claim collection card */}
        <CardDataStats
          title="Life Time Claim Collection"
          total={singleStore?.lifetimeClaimCount?.toString() || '0'}
          // rate="24 new since last visit"
          // levelUp
        >
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
              fill=""
            />
            <path
              d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
              fill=""
            />
            <path
              d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
              fill=""
            />
          </svg>
        </CardDataStats>

        {/* life time spent */}
        <CardDataStats
          title="Life Time Spent"
          total={singleStore?.lifetimeSpent?.toString() || '0'}
          // rate="52%"
          // levelUp
        >
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M106.454 32.906v1.816h-2.581v-1.9a11.633 11.633 0 0 1-6.61-3.036l2.043-2.525a9.7 9.7 0 0 0 4.567 2.44V24.17c-3.489-.908-5.844-2.156-5.844-5.5 0-3.064 2.355-5.418 5.844-5.844v-1.73h2.581v1.759a10.557 10.557 0 0 1 5.957 2.637l-1.929 2.61a9.266 9.266 0 0 0-4.028-2.127v5.333c3.887.879 6.468 2.212 6.468 5.673 0 3.259-2.355 5.642-6.468 5.925zm-2.581-12.282v-4.709a2.678 2.678 0 0 0-2.27 2.44c-.003 1.134.739 1.73 2.27 2.269zm5.5 6.694c0-1.3-.907-1.9-2.922-2.5v5.049c1.933-.223 2.925-1.3 2.925-2.549z" />
            <path d="M105.093 41.258a18.351 18.351 0 1 1 18.35-18.351 18.373 18.373 0 0 1-18.35 18.351zm0-33.2a14.851 14.851 0 1 0 14.85 14.85 14.867 14.867 0 0 0-14.85-14.851zM22.216 123.443H6.307a1.75 1.75 0 0 1-1.75-1.75V89.649a1.751 1.751 0 0 1 1.75-1.75h15.909a1.75 1.75 0 0 1 1.75 1.75v32.044a1.749 1.749 0 0 1-1.75 1.75zm-14.159-3.5h12.409V91.4H8.057zM52.215 123.443H36.306a1.75 1.75 0 0 1-1.75-1.75V78.746A1.75 1.75 0 0 1 36.306 77h15.909a1.749 1.749 0 0 1 1.75 1.75v42.947a1.749 1.749 0 0 1-1.75 1.746zm-14.159-3.5h12.409V80.5H38.056zM82.214 123.443H66.306a1.749 1.749 0 0 1-1.75-1.75v-53.85a1.749 1.749 0 0 1 1.75-1.75h15.908a1.749 1.749 0 0 1 1.75 1.75v53.85a1.749 1.749 0 0 1-1.75 1.75zm-14.158-3.5h12.408v-50.35H68.056zM113.047 123.443H97.138a1.749 1.749 0 0 1-1.75-1.75V64.144h-4.77a1.75 1.75 0 0 1-1.237-2.988l14.474-14.474a1.75 1.75 0 0 1 1.238-.513 1.746 1.746 0 0 1 1.237.513l14.47 14.474a1.75 1.75 0 0 1-1.238 2.988H114.8v57.549a1.749 1.749 0 0 1-1.753 1.75zm-14.159-3.5H111.3V62.394a1.749 1.749 0 0 1 1.75-1.75h2.3l-10.249-10.25-10.25 10.25h2.3a1.75 1.75 0 0 1 1.75 1.75z" />
          </svg>
        </CardDataStats>

        {/* current month claim collection card */}
        <CardDataStats
          title="Current Month Claim Collection"
          total={singleStore?.currentMonthClaimCount?.toString() || '0'}
          // rate="520 newly registered"
          // levelUp
        >
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="m256 207c47.972 0 87-39.028 87-87s-39.028-87-87-87-87 39.028-87 87 39.028 87 87 87zm0-144c31.43 0 57 25.57 57 57s-25.57 57-57 57-57-25.57-57-57 25.57-57 57-57z" />
              <path d="m432 207c30.327 0 55-24.673 55-55s-24.673-55-55-55-55 24.673-55 55 24.673 55 55 55zm0-80c13.785 0 25 11.215 25 25s-11.215 25-25 25-25-11.215-25-25 11.215-25 25-25z" />
              <path d="m444.1 241h-23.2c-27.339 0-50.939 16.152-61.693 39.352-22.141-24.17-53.944-39.352-89.228-39.352h-27.957c-35.284 0-67.087 15.182-89.228 39.352-10.755-23.2-34.355-39.352-61.694-39.352h-23.2c-37.44 0-67.9 30.276-67.9 67.49v109.21c0 16.156 13.194 29.3 29.412 29.3h91.727c1.538 17.9 16.59 32 34.883 32h199.957c18.292 0 33.344-14.1 34.883-32h90.679c16.796 0 30.46-13.61 30.46-30.34v-108.17c-.001-37.214-30.461-67.49-67.901-67.49zm-414.1 67.49c0-20.672 17.002-37.49 37.9-37.49h23.2c20.898 0 37.9 16.818 37.9 37.49v10.271c-10.087 26.264-8 42.004-8 98.239h-91zm331 135.489c0 2.769-2.252 5.021-5.021 5.021h-199.958c-2.769 0-5.021-2.253-5.021-5.021v-81.957c0-50.19 40.832-91.022 91.021-91.022h27.957c50.19 0 91.022 40.832 91.022 91.021zm121-27.319c0 .517 5.592.34-91 .34 0-56.651 2.071-72.018-8-98.239v-10.271c0-20.672 17.002-37.49 37.9-37.49h23.2c20.898 0 37.9 16.818 37.9 37.49z" />
              <path d="m80 207c30.327 0 55-24.673 55-55s-24.673-55-55-55-55 24.673-55 55 24.673 55 55 55zm0-80c13.785 0 25 11.215 25 25s-11.215 25-25 25-25-11.215-25-25 11.215-25 25-25z" />
            </g>
          </svg>
        </CardDataStats>

        {/* current month spent */}
        <CardDataStats
          title="Current Month Spent"
          total={singleStore?.currentMonthSpent?.toString() || '0'}
          // rate="52%"
          // levelUp
        >
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M106.454 32.906v1.816h-2.581v-1.9a11.633 11.633 0 0 1-6.61-3.036l2.043-2.525a9.7 9.7 0 0 0 4.567 2.44V24.17c-3.489-.908-5.844-2.156-5.844-5.5 0-3.064 2.355-5.418 5.844-5.844v-1.73h2.581v1.759a10.557 10.557 0 0 1 5.957 2.637l-1.929 2.61a9.266 9.266 0 0 0-4.028-2.127v5.333c3.887.879 6.468 2.212 6.468 5.673 0 3.259-2.355 5.642-6.468 5.925zm-2.581-12.282v-4.709a2.678 2.678 0 0 0-2.27 2.44c-.003 1.134.739 1.73 2.27 2.269zm5.5 6.694c0-1.3-.907-1.9-2.922-2.5v5.049c1.933-.223 2.925-1.3 2.925-2.549z" />
            <path d="M105.093 41.258a18.351 18.351 0 1 1 18.35-18.351 18.373 18.373 0 0 1-18.35 18.351zm0-33.2a14.851 14.851 0 1 0 14.85 14.85 14.867 14.867 0 0 0-14.85-14.851zM22.216 123.443H6.307a1.75 1.75 0 0 1-1.75-1.75V89.649a1.751 1.751 0 0 1 1.75-1.75h15.909a1.75 1.75 0 0 1 1.75 1.75v32.044a1.749 1.749 0 0 1-1.75 1.75zm-14.159-3.5h12.409V91.4H8.057zM52.215 123.443H36.306a1.75 1.75 0 0 1-1.75-1.75V78.746A1.75 1.75 0 0 1 36.306 77h15.909a1.749 1.749 0 0 1 1.75 1.75v42.947a1.749 1.749 0 0 1-1.75 1.746zm-14.159-3.5h12.409V80.5H38.056zM82.214 123.443H66.306a1.749 1.749 0 0 1-1.75-1.75v-53.85a1.749 1.749 0 0 1 1.75-1.75h15.908a1.749 1.749 0 0 1 1.75 1.75v53.85a1.749 1.749 0 0 1-1.75 1.75zm-14.158-3.5h12.408v-50.35H68.056zM113.047 123.443H97.138a1.749 1.749 0 0 1-1.75-1.75V64.144h-4.77a1.75 1.75 0 0 1-1.237-2.988l14.474-14.474a1.75 1.75 0 0 1 1.238-.513 1.746 1.746 0 0 1 1.237.513l14.47 14.474a1.75 1.75 0 0 1-1.238 2.988H114.8v57.549a1.749 1.749 0 0 1-1.753 1.75zm-14.159-3.5H111.3V62.394a1.749 1.749 0 0 1 1.75-1.75h2.3l-10.249-10.25-10.25 10.25h2.3a1.75 1.75 0 0 1 1.75 1.75z" />
          </svg>
        </CardDataStats>
      </div>

      <div className="flex flex-col items-center p-4 mt-7">
        <Card
          className="w-full max-w-2xl p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 mx-auto"
          title={
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Store Info
            </h2>
          }
        >
          <div className="grid gap-4">
            {/* Store ID */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600 dark:text-gray-300">
                Store ID:
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                {singleStore?.id}
              </span>
            </div>

            {/* Store URL */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600 dark:text-gray-300">
                Store:
              </span>
              <a
                href={singleStore?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {singleStore?.url}
              </a>
            </div>

            {/* Owner Name */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600 dark:text-gray-300">
                Owner:
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                {singleStore?.owner_name || 'N/A'}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600 dark:text-gray-300">
                Email:
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                {singleStore?.email}
              </span>
            </div>

            {/* Installed At */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600 dark:text-gray-300">
                Installed At:
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                {singleStore?.created_at
                  ? formatDate(singleStore.created_at)
                  : 'N/A'}
              </span>
            </div>

            {/* Products */}
            <div className="flex items-start justify-between">
              <span className="font-bold text-gray-600 dark:text-gray-300">
                Products:
              </span>
              <div className="text-gray-800 dark:text-gray-200 text-right">
                {singleStore?.products?.title ? (
                  <span>{singleStore.products.title}</span>
                ) : (
                  <span className="italic text-gray-500 dark:text-gray-400">
                    No products linked
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Onboard Steps Card */}
        {singleStore?.onboard_steps && (
          <OnboardStepsCard
            storeId={singleStore?.id!!}
            onboardSteps={JSON.parse(singleStore?.onboard_steps)}
            onUpdateSuccess={refetch}
          />
        )}

        {/* Configs Card */}
        {singleStore?.configs && (
          <ConfigsCard
            storeId={singleStore.id}
            configs={singleStore.configs}
            onUpdateSuccess={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default SingleStoreDetailsPage;
