import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useWithdraw = (onClose?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const { t } = useTranslation();

  const onSucess = () => {
    if (onClose) onClose();

    setIsLoading(false);
  };

  const txCallback = useTxCallback(onSucess);

  const mutation = useMutation(
    async (poolId: string) => {
      const [account, options] = await getFromAcct(currentAccount);

      const txExecute = api?.tx.sponsoredPool.withdrawPool(poolId);
      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'withdraw-pool',
      onError: (err: any) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: err.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  return {
    withdrawPoolBalance: (poolId: string) => {
      setIsLoading(true);
      mutation.mutate(poolId);
    },
    isLoading,
  };
};

export default useWithdraw;
