import { useMutation as useTanMutation } from '@tanstack/react-query';
import useAppQuery from './useAppQuery';

interface UseMutationOptions {
  method?: string;
  mutationOptions?: object;
}

const useMutation = (url: string, options: UseMutationOptions = {}) => {
  const { method = 'POST', mutationOptions = {} } = options;
  const { fetchQuery } = useAppQuery();
  const mutationFunction = async (input?: FormData) => {
    try {
      await fetchQuery(url, {
        method,
        body: input,
      });
    } catch (error) {
      console.log({ error });
    }
  };
  return useTanMutation({
    mutationKey: [url],
    mutationFn: (input?: FormData) => mutationFunction(input),
    ...mutationOptions,
  });
};

export default useMutation;
