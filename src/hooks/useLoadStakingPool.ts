import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import { IPool } from './useSponsoredPool';
import useStakingPool from './useStakingPool';

import { useSubstrateState } from 'contexts/substrateContext';
import { PoolInfo } from 'interfaces/pool';

const useLoadStakingPool = () => {
  const { api, currentAccount } = useSubstrateState();
  const gaEventTracker = useAnalyticsEventTracker('Staking pool');
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
  const isJoinedStakingPool =
    !!joinedPoolInfo &&
    joinedPoolInfo.ticketType.isSystem &&
    joinedPoolInfo.ticketType.asSystem.isStaking;
  const { data: poolInfo } = useQuery(
    'getStakingPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.stakingPool.services('Basic');
        const medium = await api.query.stakingPool.services('Medium');
        const advance = await api.query.stakingPool.services('Advance');
        return {
          basic: basic.unwrap(),
          medium: medium.unwrap(),
          advance: advance.unwrap(),
        };
      }
    }
  );

  const { joinStakingPool, leavePool, loadingPool } = useStakingPool(refetch);
  const stakingPools: Array<IPool> = [
    {
      poolType: t('BASIC'),
      discount: poolInfo?.basic.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.basic.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-4.png',
      fee: {
        gaki: poolInfo?.basic.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => {
        gaEventTracker({ action: 'Join basic' });
        joinStakingPool('Basic');
      },
      onLeave: () => {
        gaEventTracker({ action: 'Leave basic' });
        leavePool('Basic');
      },
      isLoading: loadingPool === 'Basic',
      isJoined:
        isJoinedStakingPool &&
        joinedPoolInfo?.ticketType.asSystem.asStaking.type === 'Basic',
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('MEDIUM'),
      discount: poolInfo?.medium.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.medium.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-5.png',
      fee: {
        gaki: poolInfo?.medium.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => {
        gaEventTracker({ action: 'Join Medium' });
        joinStakingPool('Medium');
      },
      onLeave: () => {
        gaEventTracker({ action: 'Leave Medium' });
        leavePool('Medium');
      },
      isLoading: loadingPool === 'Medium',
      isJoined:
        isJoinedStakingPool &&
        joinedPoolInfo?.ticketType.asSystem.asStaking.isMedium,
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('ADVANCE'),
      discount: poolInfo?.advance.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.advance.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-6.png',
      fee: {
        gaki: poolInfo?.advance.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => {
        gaEventTracker({ action: 'Join Advance' });
        joinStakingPool('Advance');
      },
      onLeave: () => {
        gaEventTracker({ action: 'Leave Advance' });
        leavePool('Advance');
      },
      isLoading: loadingPool === 'Advance',
      isJoined:
        isJoinedStakingPool &&
        joinedPoolInfo?.ticketType.asSystem.asStaking.isAdvance,
      isDisabled: isJoinedPool,
    },
  ];

  return {
    stakingPools,
  };
};

export default useLoadStakingPool;
