import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

export interface IPool {
  poolType: string;
  discount: number;
  rate: {
    txLimit: number;
    minute: number;
  };
  banner: string;
  fee: {
    gaki: string;
    minute: number;
  };
  onJoin: () => void;
  onLeave: () => void;
  isLoading: boolean;
  isJoined: boolean;
  isDisabled: boolean;
}

const useSponsoredPool = (refetch: () => void, onClose?: () => void) => {
  const { t } = useTranslation();

  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);

  const onFinalize = () => {
    setIsLoading(false);
  };

  const txCallback = useTxCallback(() => {
    refetch();
  }, onFinalize);

  const mutation = useMutation(
    async (poolId: string) => {
      const [account, options] = await getFromAcct(currentAccount);

      const txExecute = api?.tx.pool.join(poolId);

      return txExecute?.signAndSend(account, options || {}, txCallback);
    },
    {
      mutationKey: 'join-sponsored-pool',
      onError: (error: any) => {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  const joinSponsoredPool = async (poolId: string) => {
    setIsLoading(true);

    return mutation.mutate(poolId);
  };

  return {
    joinSponsoredPool,
    isLoading,
  };
};

export default useSponsoredPool;
