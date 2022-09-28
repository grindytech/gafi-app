// Translation
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Chakra

// Utils
import useSignAndSend from './useCallbackSignAndSend';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

// React

const useUpfrontPool = (refetch: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();

  const { api, currentAccount } = useSubstrateState();
  const [loadingPool, setLoadingPool] = useState('');

  const onSuccess = () => {
    refetch();
    setLoadingPool('');
  };

  const txCallback = useSignAndSend(onSuccess);

  const joinUpfrontPool = async (poolPackage: string) => {
    setLoadingPool(poolPackage);

    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join({
        Upfront: poolPackage,
      });
      try {
        await txExecute.signAndSend(account, options || {}, txCallback);
      } catch (err: any) {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: err.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setLoadingPool('');
      }
    }
  };

  return {
    loadingPool,
    joinUpfrontPool,
  };
};

export default useUpfrontPool;
