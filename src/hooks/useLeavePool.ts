import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useLeavePool = (refetch: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();

  const [leaveLoadingPool, setLeaveLoadingPool] = useState('');

  const onSucess = () => {
    refetch();
    setLeaveLoadingPool('');
  };

  const txCallback = useTxCallback(onSucess);

  const leavePool = async (poolPackage: string) => {
    setLeaveLoadingPool(poolPackage);

    const [account, options] = await getFromAcct(currentAccount);

    if (api) {
      const txExecute = api.tx.pool.leave();

      try {
        return options
          ? await txExecute.signAndSend(account, options, txCallback)
          : await txExecute.signAndSend(account, txCallback);
      } catch (error: any) {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setLeaveLoadingPool('');
      }
    }
  };

  return {
    leavePool,
    leaveLoadingPool,
  };
};

export default useLeavePool;
