import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useSignAndSend from './useCallbackSignAndSend';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useStakingPool = (refetch: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [loadingPool, setLoadingPool] = useState('');

  const { api, currentAccount } = useSubstrateState();

  const onSuccess = () => {
    refetch();
    setLoadingPool('');
  };

  const txCallback = useSignAndSend(onSuccess);

  const joinStakingPool = async (poolPackage: string) => {
    setLoadingPool(poolPackage);

    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join({
        Staking: poolPackage,
      });

      try {
        await txExecute.signAndSend(account, options || {}, txCallback);
      } catch (error: any) {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setLoadingPool('');
      }
    }
  };

  return {
    joinStakingPool,
    loadingPool,
  };
};

export default useStakingPool;
