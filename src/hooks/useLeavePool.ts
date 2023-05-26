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
  };

  const onFinalize = () => {
    setLeaveLoadingPool('');
  };

  const txCallback = useTxCallback(onSucess, onFinalize);

  const leavePool = async (poolPackage: string) => {
    setLeaveLoadingPool(poolPackage);

    if (api && currentAccount) {
      const [account, options] = await getFromAcct(currentAccount);
      const txExecute = api.tx.pool.leave(poolPackage);

      try {
        return options
          ? await txExecute.signAndSend(account, options, txCallback)
          : await txExecute.signAndSend(account, txCallback);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            position: 'top-right',
            description: t('TRANSACTION_FAILED', {
              errorMessage: error.toString(),
            }),
            isClosable: true,
            status: 'error',
          });
        }
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
