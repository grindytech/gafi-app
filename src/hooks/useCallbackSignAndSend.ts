import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSubstrateState } from 'contexts/substrateContext';
import { handleTxError } from 'utils';

export default function useCallbackSignAndSend(refreshData: () => void) {
  const { t } = useTranslation();

  const toast = useToast();

  const { api, currentAccount } = useSubstrateState();

  const [loadingPool, setLoadingPool] = useState('');

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
      setLoadingPool('');
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

  return {
    api,
    txCallback,
    setLoadingPool,
    loadingPool,
    currentAccount,
  };
}
