import { useToast } from '@chakra-ui/react';
import * as axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import useTxCallback from './useTxCallback';

import config from 'config';
import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

interface IWhitelistSetRequest {
  pool_id: string;
  address: string[];
}

export const useLoadWhitelist = (poolId: string) => {
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoadingEnableWhitelist, setIsLoadingEnableWhitelist] =
    useState(false);

  const txCallback = useTxCallback(() => setIsLoadingEnableWhitelist(false));

  const { api, currentAccount } = useSubstrateState();

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

  const mutationEnableWhitelist = useMutation(
    async () => {
      setIsLoadingEnableWhitelist(true);
      const [account, options] = await getFromAcct(currentAccount);
      const txChangeContractOwnerExecute =
        await api?.tx.palletWhitelist.enableWhitelist(
          poolId,
          'https://whitelist.gafi.network'
        );

      return txChangeContractOwnerExecute?.signAndSend(
        account,
        options || {},
        txCallback
      );
    },
    {
      mutationKey: 'change-contract-onwer',
      onError: (error: any) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoadingEnableWhitelist(false);
      },
    }
  );

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
    data,
    mutationWhitelist,
    mutationEnableWhitelist,
    isLoadingWhitelist,
    isLoadingEnableWhitelist,
  };
};
