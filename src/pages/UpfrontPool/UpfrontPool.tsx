import { Box, SimpleGrid, useToast } from '@chakra-ui/react';
import {
  GafiPrimitivesTicket,
  GafiPrimitivesTicketTicketInfo,
} from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import Pool, { IPool } from './components/Pool';

import Banner from 'components/Banner';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'contexts/substrateContext';
import { PoolInfo } from 'interfaces/pool';

export interface TicketType {
  upfront?: string;
  staking?: string;
}

export const cardVariant = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const JoinPool = () => {
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

  const { data: joinedUpfrontPoolInfo, refetch: refetchJoinedUpfrontPoolInfo } =
    useQuery(
      ['getJoinedUpfrontPool', currentAccount],
      async (): Promise<GafiPrimitivesTicket | undefined> => {
        if (api) {
          const res = await api.query.upfrontPool.tickets(
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
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      refetch();
      refetchJoinedUpfrontPoolInfo();
      setSelectedPool('');
    } else {
      toast({
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
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

  return (
    <>
      <Banner
        title={t('POOL.UPFRONT_POOL')}
        subTitle={t('POOL_DESCRIPTION.UPFRONT_POOL')}
        bannerBg="/assets/layout/upfront-banner-bg.png"
        btnLink="https://wiki.gafi.network/learn/upfront-pool"
      />
      <SimpleGrid mt="4" minChildWidth="308px" spacing="1em" minH="full">
        {React.Children.toArray(
          pools.map((pool: IPool) => <Pool pool={pool} />)
        )}
      </SimpleGrid>
    </>
  );
};

export default JoinPool;
