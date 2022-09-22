// Translation
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// Chakra

// Utils
import useCallbackSignAndSend from './useCallbackSignAndSend';

import { getFromAcct } from 'utils';

// React

const useUpfrontPool = (refreshData: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();

  const { txCallback, loadingPool, setLoadingPool, currentAccount, api } =
    useCallbackSignAndSend(refreshData);

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
