import {
  useQuery as useTanQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import useAppQuery from './useAppQuery';

const useQuery = <T>(
  url: string,
  queryOption?: UseQueryOptions<T>,
): UseQueryResult<T> => {
  const { fetchQuery } = useAppQuery();

  const fetchFunction = async (): Promise<T> => {
    return fetchQuery(url);
  };

  return useTanQuery<T>({
    queryKey: [url],
    queryFn: fetchFunction,
    ...queryOption,
  });
};

export default useQuery;
