import { GafiPrimitivesTicketTicketType } from '@polkadot/types/lookup';
import { AnyJson } from '@polkadot/types/types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import { IPool } from './useSponsoredPool';
import useStakingPool from './useStakingPool';

import { useSubstrateState } from 'contexts/substrateContext';
import useLeavePool from 'hooks/useLeavePool';

export interface IStakingProps {
  service: Record<string, AnyJson>;
  id: `0x${string}`;
  value: string;
}

export interface IStakingTypeProps {
  ticketType?: {
    Staking: string;
    Upfront: string;
  };
}

const useLoadStakingPool = () => {
  const { api, currentAccount } = useSubstrateState();

  const gaEventTracker = useAnalyticsEventTracker('Staking pool');

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
    'getStakingPoolInfo',
    async (): Promise<IStakingProps[] | undefined> => {
      if (api) {
        const res = await api.query.stakingPool.services.entries();

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
  const { joinStakingPool, loadingPool } = useStakingPool(refetch);

  const stakingPools = poolInfo?.map((item, index) => {
    const poolItem: Array<IPool> = [
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
          joinStakingPool(item.id);
        },
        onLeave: () => {
          gaEventTracker({
            action: 'Leave basic',
          });
          leavePool(item.id);
        },
        isLoading: (loadingPool || leaveLoadingPool) === item.id,
        isJoined:
          !!isJoinedPool && isJoinedPool.ticketType?.Staking === item.id,
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
          joinStakingPool(item.id);
        },
        onLeave: () => {
          gaEventTracker({
            action: 'Leave medium',
          });
          leavePool(item.id);
        },
        isLoading: (loadingPool || leaveLoadingPool) === item.id,
        isJoined:
          !!isJoinedPool && isJoinedPool.ticketType?.Staking === item.id,
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
          joinStakingPool(item.id);
        },
        onLeave: () => {
          gaEventTracker({
            action: 'Leave advance',
          });
          leavePool(item.id);
        },
        isLoading: (loadingPool || leaveLoadingPool) === item.id,
        isJoined:
          !!isJoinedPool && isJoinedPool.ticketType?.Staking === item.id,
        isDisabled: !!isJoinedPool,
      },
    ];

    return poolItem[index]; // reason index: Types of parameters 'pool' and 'value' are incompatible.
  });

  return {
    stakingPools,
  };
};

export default useLoadStakingPool;
