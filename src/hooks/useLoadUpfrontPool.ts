import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import useAnalyticsEventTracker from './useAnalyticsEventTracker';
import { IPool } from './useSponsoredPool';
import useUpfrontPool from './useUpfrontPool';

import { useSubstrateState } from 'contexts/substrateContext';
import { PoolInfo } from 'interfaces/pool';

const useLoadUpfrontPool = () => {
  const { api, currentAccount } = useSubstrateState();
  const gaEventTracker = useAnalyticsEventTracker('Upfront pool');
  const { t } = useTranslation();
  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketInfo | undefined> => {
      if (api) {
        const res = await api.query.pool.tickets(
          currentAccount?.address as string
        );
        // console.log('res', res)
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
        // console.log('loading')
        const basic = await api.query.upfrontPool.services('Basic');
        // console.log('result: ', basic )
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

  // console.log('upfrontPoolInfo', upfrontPoolInfo)

  const { joinUpfrontPool, leavePool, loadingPool } = useUpfrontPool(refetch);
  const upfrontPools: Array<IPool> = [
    {
      poolType: t('BASIC'),
      discount: upfrontPoolInfo?.basic.service.discount.toNumber() || 0,
      rate: {
        txLimit: upfrontPoolInfo?.basic.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-1.svg',
      fee: {
        gaki: upfrontPoolInfo?.basic.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => {
        gaEventTracker({ action: 'Join basic' });
        joinUpfrontPool('Basic');
      },
      onLeave: () => {
        gaEventTracker({ action: 'Leave basic' });
        leavePool('Basic');
      },
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
      banner: '/assets/layout/pool-banner-2.svg',
      fee: {
        gaki: upfrontPoolInfo?.medium.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => {
        gaEventTracker({ action: 'Join Medium' });
        joinUpfrontPool('Medium');
      },
      onLeave: () => {
        gaEventTracker({ action: 'Leave Medium' });
        leavePool('Medium');
      },
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
      banner: '/assets/layout/pool-banner-3.svg',
      fee: {
        gaki: upfrontPoolInfo?.advance.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => {
        gaEventTracker({ action: 'Join Advance' });
        joinUpfrontPool('Advance');
      },
      onLeave: () => {
        gaEventTracker({ action: 'Leave Advance' });
        leavePool('Advance');
      },
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
