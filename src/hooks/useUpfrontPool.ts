import { useToast } from '@chakra-ui/react';
import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';
import { PoolInfo } from 'interfaces/pool';
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
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketInfo | undefined> => {
      if (api) {
        const res = await api.query.pool.tickets(
          currentAccount?.address as string
        );
        if (res.isSome) {
          return res.unwrap();
        }
        return undefined;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  const isJoinedPool = !!joinedPoolInfo?.ticketType.toHuman();
  const isJoinedUpfrontPool =
    !!joinedPoolInfo &&
    joinedPoolInfo.ticketType.isSystem &&
    joinedPoolInfo.ticketType.asSystem.isUpfront;

  const { data: poolInfo } = useQuery(
    'getPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.upfrontPool.services('Basic');
        const medium = await api.query.upfrontPool.services('Medium');
        const advance = await api.query.upfrontPool.services('Advance');
        return {
          basic: basic.unwrap(),
          medium: medium.unwrap(),
          advance: advance.unwrap(),
        };
      }
    }
  );

  const pools: Array<IPool> = [
    {
      poolType: t('BASIC'),
      discount: poolInfo?.basic.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.basic.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-1.png',
      fee: {
        gaki: poolInfo?.basic.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => onJoinPool('Basic'),
      onLeave: () => onLeavePool('Basic'),
      isLoading: selectedPool === 'Basic',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo.ticketType.asSystem.asUpfront.type === 'Basic',
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('MEDIUM'),
      discount: poolInfo?.medium.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.medium.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-2.png',
      fee: {
        gaki: poolInfo?.medium.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => onJoinPool('Medium'),
      onLeave: () => onLeavePool('Medium'),
      isLoading: selectedPool === 'Medium',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo.ticketType.asSystem.asUpfront.isMedium,
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('ADVANCE'),
      discount: poolInfo?.advance.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.advance.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-3.png',
      fee: {
        gaki: poolInfo?.advance.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => onJoinPool('Advance'),
      onLeave: () => onLeavePool('Advance'),
      isLoading: selectedPool === 'Advance',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo.ticketType.asSystem.asUpfront.isAdvance,
      isDisabled: isJoinedPool,
    },
  ];

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      refetch();
      setSelectedPool('');
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join({ System: { Upfront: poolPackage } });
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
          setSelectedPool('');
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
          setSelectedPool('');
        }
      }
    }
  };

  const onLeavePool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
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
          setSelectedPool('');
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
          setSelectedPool('');
        }
      }
    }
  };
  return {
    pools,
  };
};

export default useUpfrontPool;
