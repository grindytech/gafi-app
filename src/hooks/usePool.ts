import { useToast } from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const useUpfrontPool = () => {
  const { t } = useTranslation();

  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [loadingPool, setLoadingPool] = useState('');

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      setLoadingPool('');
    } else {
      toast({
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

  const leavePool = async (poolPackage: string) => {
    setLoadingPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);
    if (api) {
      const txExecute = api.tx.pool.leave();
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
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

  return {
    joinUpfrontPool,
    joinStakingPool,
    leavePool,
    loadingPool,
  };
};

export default useUpfrontPool;
