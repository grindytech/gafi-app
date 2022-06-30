import { useMediaQuery, useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct, handleTxError } from 'utils';

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

const usePool = (refreshData: () => void, onClose?: () => void) => {
  const { t } = useTranslation();

  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [loadingPool, setLoadingPool] = useState('');
  const [isSponsoredPoolLoading, setIsSponsoredPoolLoading] = useState(false);

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
      setIsSponsoredPoolLoading(false);
      setLoadingPool('');
      if (onClose) {
        onClose();
      }
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

  const joinUpfrontPool = async (poolPackage: string) => {
    setLoadingPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join({ System: { Upfront: poolPackage } });
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

  const joinStakingPool = async (poolPackage: string) => {
    setLoadingPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join({ System: { Staking: poolPackage } });
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

  const leavePool = async (poolPackage?: string) => {
    if (poolPackage) {
      setLoadingPool(poolPackage || '');
    } else {
      setIsSponsoredPoolLoading(true);
    }
    const [account, options] = await getFromAcct(currentAccount);
    if (api) {
      const txExecute = api.tx.pool.leave();
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
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
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
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
    }
  };

  const mutation = useMutation(
    async (poolId: string) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txExecute = api?.tx.pool.join({ Custom: { Sponsored: poolId } });
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
        setIsSponsoredPoolLoading(false);
      },
    }
  );

  const joinSponsoredPool = async (poolId: string) => {
    setIsSponsoredPoolLoading(true);
    mutation.mutate(poolId);
  };

  return {
    joinUpfrontPool,
    joinStakingPool,
    leavePool,
    loadingPool,
    joinSponsoredPool,
    isSponsoredPoolLoading,
  };
};

export default usePool;
