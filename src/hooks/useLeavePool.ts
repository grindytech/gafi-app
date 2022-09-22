import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

const useLeavePool = (refreshData: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();

  const [leaveLoadingPool, setLeaveLoadingPool] = useState('');

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        position: 'top-right',
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      refreshData();
      setLeaveLoadingPool('');
    } else {
      toast({
        position: 'top-right',
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
        isClosable: true,
        status: 'info',
      });
    }
  };

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
