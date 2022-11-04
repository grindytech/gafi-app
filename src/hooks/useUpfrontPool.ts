import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useUpfrontPool = (refetch: () => void) => {
  const { t } = useTranslation();

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    status: 'error',
  });

  const [loadingPool, setLoadingPool] = useState('');
  const { api, currentAccount } = useSubstrateState();

  const onSuccess = () => {
    refetch();
  };

  const onFinalize = () => {
    setLoadingPool('');
  };

  const txCallback = useTxCallback(onSuccess, onFinalize);

  const joinUpfrontPool = async (poolPackage: string) => {
    if (!currentAccount) {
      return toast({
        description: t('POLKADOT_ADDRESS'),
      });
    }

    setLoadingPool(poolPackage);

    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join(poolPackage);

      try {
        await txExecute.signAndSend(account, options || {}, txCallback);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            description: t('TRANSACTION_FAILED', {
              errorMessage: err.toString(),
            }),
          });
        }
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
