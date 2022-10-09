import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useStakingPool = (refetch: () => void) => {
  const { t } = useTranslation();

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    status: 'error',
  });

  const [loadingPool, setLoadingPool] = useState('');
  const { api, currentAccount } = useSubstrateState();

  const onSucess = () => {
    setLoadingPool('');
    refetch();
  };

  const txCallback = useTxCallback(onSucess);

  const joinStakingPool = async (poolPackage: string) => {
    if (!currentAccount) {
      return toast({
        description: t('POLKADOT_ADDRESS'),
      });
    }

    setLoadingPool(poolPackage);

    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      try {
        const txExecute = await api.tx.pool.join(poolPackage);

        await txExecute.signAndSend(account, options || {}, txCallback);
      } catch (error: any) {
        toast({
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
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
