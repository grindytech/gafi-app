import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useUpfrontPool = (refetch: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [loadingPool, setLoadingPool] = useState('');
  const { api, currentAccount } = useSubstrateState();

  const onSucess = () => {
    setLoadingPool('');
    refetch();
  };

  const txCallback = useTxCallback(onSucess);

  const joinUpfrontPool = async (poolPackage: string) => {
    setLoadingPool(poolPackage);

    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join(poolPackage);

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
