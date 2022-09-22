import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import useCallbackSignAndSend from './useCallbackSignAndSend';

import { getFromAcct } from 'utils';

const useStakingPool = (refreshData: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();

  const { txCallback, loadingPool, setLoadingPool, currentAccount, api } =
    useCallbackSignAndSend(refreshData);

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
