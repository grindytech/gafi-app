import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useEditPool = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();

  const refetch = () => {
    onSuccess();
  };

  const onFinalize = () => {
    setIsLoading(false);
  };

  const txCallback = useTxCallback(refetch, onFinalize);

  const poolNameMutation = useMutation(
    async (params: { poolName: string; poolId: string }) => {
      if (!currentAccount) {
        return;
      }

      const [account, options] = await getFromAcct(currentAccount);
      const txSetPoolNameExecute = api?.tx.sponsoredPool.setPoolName(
        params.poolId,
        params.poolName
      );
      return txSetPoolNameExecute?.signAndSend(
        account,
        options || {},
        txCallback
      );
    },
    {
      mutationKey: 'update-pool-name',
      onError: (error: Error) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  return {
    editPoolName: (poolName: string, poolId: string) => {
      setIsLoading(true);
      return poolNameMutation.mutate({ poolName, poolId });
    },
    isLoading,
  };
};

export default useEditPool;
