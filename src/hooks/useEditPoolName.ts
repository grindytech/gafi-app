import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';

const useEditPool = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
      onSuccess();
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

  const poolNameMutation = useMutation(
    async (params: { poolName: string; poolId: string }) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txSetPoolNameExecute = api?.tx.sponsoredPool.setPoolName(
        params.poolId,
        params.poolName
      );
      if (options) {
        return txSetPoolNameExecute?.signAndSend(account, options, txCallback);
      }
      return txSetPoolNameExecute?.signAndSend(account, txCallback);
    },
    {
      mutationKey: 'update-pool-name',
      onError: (error: any) => {
        toast({
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
      poolNameMutation.mutate({ poolName, poolId });
    },
    isLoading,
  };
};

export default useEditPool;
