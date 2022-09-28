import { GafiPrimitivesPoolTicketType } from '@polkadot/types/lookup';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import useLeavePool from './useLeavePool';
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
    async (): Promise<GafiPrimitivesPoolTicketType | undefined> => {
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
  const { data: poolInfo } = useQuery(
    'getStakingPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.stakingPool.services('Basic');
        const medium = await api.query.stakingPool.services('Medium');
        const advance = await api.query.stakingPool.services('Advance');

        return {
          basic,
          medium,
          advance,
        };
      }
    }
  );

  const isJoinedPool = !!joinedPoolInfo?.toHuman();
  const isJoinedStakingPool = !!joinedPoolInfo && joinedPoolInfo.isStaking;

  const { leavePool, leaveLoadingPool } = useLeavePool(refetch);
  const { joinStakingPool, loadingPool } = useStakingPool(refetch);

  const stakingPools: Array<IPool> = [
    {
      poolType: t('BASIC'),
      discount: poolInfo?.basic.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.basic.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-4.svg',
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
      isLoading: (loadingPool || leaveLoadingPool) === 'Basic',
      isJoined:
        isJoinedStakingPool && joinedPoolInfo.asStaking.type === 'Basic',
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('MEDIUM'),
      discount: poolInfo?.medium.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.medium.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-5.svg',
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
      isLoading: (loadingPool || leaveLoadingPool) === 'Medium',
      isJoined: isJoinedStakingPool && joinedPoolInfo.asStaking.isMedium,
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('ADVANCE'),
      discount: poolInfo?.advance.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.advance.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-6.svg',
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
      isLoading: (loadingPool || leaveLoadingPool) === 'Advance',
      isJoined: isJoinedStakingPool && joinedPoolInfo.asStaking.isAdvance,
      isDisabled: isJoinedPool,
    },
  ];

  return {
    stakingPools,
  };
};

export default useLoadStakingPool;
