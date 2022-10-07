import { GafiPrimitivesTicketTicketType } from '@polkadot/types/lookup';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import useLeavePool from './useLeavePool';
import { IStakingProps, IStakingTypeProps } from './useLoadStakingPool';
import useUpfrontPool from './useUpfrontPool';

import { useSubstrateState } from 'contexts/substrateContext';

const useLoadUpfrontPool = () => {
  const { api, currentAccount } = useSubstrateState();
  const gaEventTracker = useAnalyticsEventTracker('Upfront pool');
  const { t } = useTranslation();

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketType | undefined> => {
      if (api && currentAccount) {
        const res = await api.query.pool.tickets(currentAccount.address, null);

        return res as GafiPrimitivesTicketTicketType;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  const { data: poolInfo } = useQuery(
    'getPoolInfo',
    async (): Promise<IStakingProps[] | undefined> => {
      if (api) {
        const res = await api.query.upfrontPool.services.entries();

        const services = res.map(([{}, exposure]) => {
          const service = exposure.unwrap();

          return {
            service: service.service.toHuman(),
            id: service.id.toHex(),
            value: service.value.toHuman(),
          };
        });

        return services;
      }
    }
  );

  const isJoinedPool = joinedPoolInfo?.toHuman() as IStakingTypeProps;

  const { leavePool, leaveLoadingPool } = useLeavePool(refetch);
  const { joinUpfrontPool, loadingPool } = useUpfrontPool(refetch);

  const upfrontPools = poolInfo?.map((item, index) => {
    const poolItem = [
      {
        poolType: t(`Basic`),
        discount: parseInt(`${item.service.discount}`, 10),
        rate: {
          txLimit: parseInt(`${item.service.txLimit}`, 10),
          minute: 30,
        },
        banner: '/assets/layout/pool-banner-4.svg',
        fee: {
          gaki: item.value,
          minute: 30,
        },
        onJoin: () => {
          gaEventTracker({
            action: 'Join basic',
          });
          joinUpfrontPool(item.id);
        },
        onLeave: () => {
          gaEventTracker({
            action: 'Leave basic',
          });
          leavePool(item.id);
        },
        isLoading: (loadingPool || leaveLoadingPool) === item.id,
        isJoined:
          !!isJoinedPool && isJoinedPool.ticketType?.Upfront === item.id,
        isDisabled: !!isJoinedPool,
      },
      {
        poolType: t(`Medium`),
        discount: parseInt(`${item.service.discount}`, 10),
        rate: {
          txLimit: parseInt(`${item.service.txLimit}`, 10),
          minute: 30,
        },
        banner: '/assets/layout/pool-banner-5.svg',
        fee: {
          gaki: item.value,
          minute: 30,
        },
        onJoin: () => {
          gaEventTracker({
            action: 'Join medium',
          });
          joinUpfrontPool(item.id);
        },
        onLeave: () => {
          gaEventTracker({
            action: 'Leave medium',
          });
          leavePool(item.id);
        },
        isLoading: (loadingPool || leaveLoadingPool) === item.id,
        isJoined:
          !!isJoinedPool && isJoinedPool.ticketType?.Upfront === item.id,
        isDisabled: !!isJoinedPool,
      },
      {
        poolType: t(`Advance`),
        discount: parseInt(`${item.service.discount}`, 10),
        rate: {
          txLimit: parseInt(`${item.service.txLimit}`, 10),
          minute: 30,
        },
        banner: '/assets/layout/pool-banner-6.svg',
        fee: {
          gaki: item.value,
          minute: 30,
        },
        onJoin: () => {
          gaEventTracker({
            action: 'Join advance',
          });
          joinUpfrontPool(item.id);
        },
        onLeave: () => {
          gaEventTracker({
            action: 'Leave advance',
          });
          leavePool(item.id);
        },
        isLoading: (loadingPool || leaveLoadingPool) === item.id,
        isJoined:
          !!isJoinedPool && isJoinedPool.ticketType?.Upfront === item.id,
        isDisabled: !!isJoinedPool,
      },
    ];

    return poolItem[index]; // reason index: Types of parameters 'pool' and 'value' are incompatible.
  });

  return {
    upfrontPools,
  };
};

export default useLoadUpfrontPool;
