import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import useLeavePool from './useLeavePool';
import { IStakingServiceProps } from './useLoadStakingPool';
import useUpfrontPool from './useUpfrontPool';

import { useSubstrateState } from 'contexts/substrateContext';

const useLoadUpfrontPool = () => {
  const { api, currentAccount } = useSubstrateState();
  const gaEventTracker = useAnalyticsEventTracker('Upfront pool');
  const { t } = useTranslation();

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketInfo[] | undefined> => {
      if (api && currentAccount) {
        const res = await api.query.pool.tickets.entries(
          currentAccount.address
        );

        const tickets = res
          .map(([{}, exposure]) => {
            if (exposure.isSome) {
              return exposure.unwrap();
            }
          })
          .filter((item): item is GafiPrimitivesTicketTicketInfo => !!item);

        return tickets;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  const { data: poolInfo } = useQuery(
    'getPoolInfo',
    async (): Promise<IStakingServiceProps[] | undefined> => {
      if (api) {
        const res = await api.query.upfrontPool.services.entries();

        const services = res
          .map(([{}, exposure]) => {
            if (exposure.isSome) {
              const service = exposure.unwrap();

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
  const { joinUpfrontPool, loadingPool } = useUpfrontPool(refetch);

  const poolType = [
    { poolType: t('BASIC'), banner: '/assets/layout/pool-banner-4.svg' },
    { poolType: t('MEDIUM'), banner: '/assets/layout/pool-banner-5.svg' },
    { poolType: t('ADVANCE'), banner: '/assets/layout/pool-banner-6.svg' },
  ];

  const upfrontPools = poolInfo?.map((pool, index) => {
    const isJoinedPool = !!joinedPoolInfo?.length;
    const isJoinedPoolTicket = !!joinedPoolInfo?.find(item => {
      if (item.ticketType.isUpfront) {
        return item.ticketType.asUpfront.toHuman() === pool.id;
      }
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
        minute: 30,
      },
      onJoin: () => {
        gaEventTracker({
          action: `Join ${poolType[index].poolType}`,
        });
        joinUpfrontPool(pool.id);
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
    upfrontPools,
  };
};

export default useLoadUpfrontPool;
