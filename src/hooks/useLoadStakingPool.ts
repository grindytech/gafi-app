import {
  GafiPrimitivesPoolService,
  GafiPrimitivesSystemServicesSystemService,
} from '@polkadot/types/lookup';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import useJoinedPoolInfo from './useJoinedPoolInfo';
import useStakingPool from './useStakingPool';

import { useSubstrateState } from 'contexts/substrateContext';
import useLeavePool from 'hooks/useLeavePool';

export interface IStakingServiceProps {
  service: GafiPrimitivesPoolService;
  id: `0x${string}`;
  value: string;
}

const useLoadStakingPool = () => {
  const { api } = useSubstrateState();
  const gaEventTracker = useAnalyticsEventTracker('Staking pool');
  const { t } = useTranslation();

  const { joinedPoolInfo, refetch, isJoinedPool } = useJoinedPoolInfo();

  const { data: poolInfo } = useQuery(
    'getStakingPoolInfo',
    async (): Promise<IStakingServiceProps[] | undefined> => {
      if (api) {
        const res = await api.query.stakingPool.services.entries();

        const services = res
          .map(([{}, exposure]) => {
            if (exposure.isSome) {
              const service: GafiPrimitivesSystemServicesSystemService =
                exposure.unwrap();

              return {
                service: service.service,
                id: service.id.toHex(),
                value: service.value.toHuman(),
              };
            }
          })
          .filter((item): item is IStakingServiceProps => !!item)
          .sort((item1, item2) =>
            item1.service.discount.cmp(item2.service.discount)
          );

        return services;
      }
    }
  );

  const { leavePool, leaveLoadingPool } = useLeavePool(refetch);
  const { joinStakingPool, loadingPool } = useStakingPool(refetch);

  const poolType = [
    { poolType: t('BASIC'), banner: '/assets/layout/pool-banner-4.svg' },
    { poolType: t('MEDIUM'), banner: '/assets/layout/pool-banner-5.svg' },
    { poolType: t('ADVANCE'), banner: '/assets/layout/pool-banner-6.svg' },
  ];

  const stakingPools = poolInfo?.map((pool, index) => {
    const isJoinedPoolTicket = !!joinedPoolInfo?.find(item => {
      if (item.ticketType.isStaking) {
        return item.ticketType.asStaking.toHuman() === pool.id;
      }

      return false;
    });

    return {
      ...poolType[index],
      poolType: poolType[index].poolType,
      discount: pool.service.discount.toNumber(),
      rate: {
        txLimit: pool.service.txLimit.toNumber(),
        minute: 30,
      },
      banner: poolType[index].banner,
      fee: {
        gaki: pool.value,
        minute: 0,
      },
      onJoin: () => {
        gaEventTracker({
          action: `Join ${poolType[index].poolType}`,
        });
        joinStakingPool(pool.id);
      },
      onLeave: () => {
        gaEventTracker({
          action: `Leave ${poolType[index].poolType}`,
        });
        leavePool(pool.id);
      },
      isLoading: (loadingPool || leaveLoadingPool) === pool.id,
      isJoined: isJoinedPoolTicket,
      isDisabled: isJoinedPool,
    };
  });

  return {
    stakingPools,
  };
};

export default useLoadStakingPool;
