import { useToast } from '@chakra-ui/react';
import * as axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import config from 'config';

interface IWhitelistSetRequest {
  pool_id: string;
  address: string[];
}

export const useLoadWhitelist = (poolId: string) => {
  const toast = useToast();
  const { t } = useTranslation();

  const httpHandler = axios.default.create({
    baseURL: config.WHITELIST_DEFAULT_URL,
  });

  const { data, isLoading: isLoadingWhitelist } = useQuery(
    ['queryPoolWhitelist', poolId],
    async (): Promise<string[]> => {
      const res = await httpHandler.get(
        `/whitelist/get?pool_id=${poolId.replace('0x', '')}`
      );
      return res.data;
    },
    { enabled: !!poolId, staleTime: 60000 }
  );

  const setWhitelistAddressURL = !data ? '/whitelist/create' : '/whitelist/add';

  const mutationWhitelist = useMutation(
    async (whitelistData: IWhitelistSetRequest): Promise<void> => {
      await httpHandler.post(setWhitelistAddressURL, whitelistData);
    },
    {
      onSuccess: () => {
        toast({
          position: 'top-right',
          description: t('ADD_ADDRESS_TO_WHITELIST_SUCCESSFULLY'),
          isClosable: true,
          status: 'success',
        });
      },
      onError: error => {
        console.log('error', (error as axios.AxiosError).message);
      },
    }
  );

  return {
    mutationWhitelist,
    data,
    isLoadingWhitelist,
    isLoadingMutationWhitelist: mutationWhitelist.isLoading,
  };
};
