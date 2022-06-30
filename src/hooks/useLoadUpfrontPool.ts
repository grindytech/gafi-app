import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useUpfrontPool, { IPool } from './usePool';

import { useSubstrateState } from 'contexts/substrateContext';
import { PoolInfo } from 'interfaces/pool';

const useLoadUpfrontPool = () => {
  const { api, currentAccount } = useSubstrateState();
  const { t } = useTranslation();
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
  const { data: upfrontPoolInfo } = useQuery(
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

  const { joinUpfrontPool, leavePool, loadingPool } = useUpfrontPool(refetch);
  const upfrontPools: Array<IPool> = [
    {
      poolType: t('BASIC'),
      discount: upfrontPoolInfo?.basic.service.discount.toNumber() || 0,
      rate: {
        txLimit: upfrontPoolInfo?.basic.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-1.png',
      fee: {
        gaki: upfrontPoolInfo?.basic.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => joinUpfrontPool('Basic'),
      onLeave: () => leavePool('Basic'),
      isLoading: loadingPool === 'Basic',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo?.ticketType.asSystem.asUpfront.type === 'Basic',
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('MEDIUM'),
      discount: upfrontPoolInfo?.medium.service.discount.toNumber() || 0,
      rate: {
        txLimit: upfrontPoolInfo?.medium.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-2.png',
      fee: {
        gaki: upfrontPoolInfo?.medium.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => joinUpfrontPool('Medium'),
      onLeave: () => leavePool('Medium'),
      isLoading: loadingPool === 'Medium',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo?.ticketType.asSystem.asUpfront.isMedium,
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('ADVANCE'),
      discount: upfrontPoolInfo?.advance.service.discount.toNumber() || 0,
      rate: {
        txLimit: upfrontPoolInfo?.advance.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-3.png',
      fee: {
        gaki: upfrontPoolInfo?.advance.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => joinUpfrontPool('Advance'),
      onLeave: () => leavePool('Advance'),
      isLoading: loadingPool === 'Advance',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo?.ticketType.asSystem.asUpfront.isAdvance,
      isDisabled: isJoinedPool,
    },
  ];

  return {
    upfrontPools,
  };
};

export default useLoadUpfrontPool;
