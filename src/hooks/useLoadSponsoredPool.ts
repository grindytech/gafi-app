import { GafiPrimitivesPoolTicketType } from '@polkadot/types/lookup';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useQueryParam } from 'use-query-params';

import { useSubstrateState } from 'contexts/substrateContext';
import client from 'graphQL/client';
import { SponsoredPool, useSponsoredPoolsQuery } from 'graphQL/generates';
import { getGAKIAccountAddress } from 'utils';
import * as constants from 'utils/constants';

const useLoadSponsoredPool = () => {
  const { api, currentAccount } = useSubstrateState();
  const [type, _] = useQueryParam('type');
  const isOwned = type === 'owned';
  const [currentPage, setCurrentPage] = useState(1);
  const [joinedPool, setJoinedPool] = useState<SponsoredPool | undefined>();
  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesPoolTicketType | undefined> => {
      if (api && currentAccount?.address) {
        const res = await api.query.pool.tickets(currentAccount?.address);
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

  const isJoinedPool = !!joinedPoolInfo?.toHuman();

  const { data: sponsoredPoolData, isLoading } = useSponsoredPoolsQuery(
    client,
    {
      first: constants.SPONSORED_POOL_AMOUNT_PER_PAGE,
      offset: isOwned
        ? 0
        : (currentPage - 1) * constants.SPONSORED_POOL_AMOUNT_PER_PAGE,
      filter: isOwned
        ? {
            poolOwner: {
              equalTo: currentAccount?.addressRaw
                ? getGAKIAccountAddress(currentAccount?.addressRaw)
                : '',
            },
          }
        : undefined,
    },
    { enabled: !!currentAccount?.addressRaw }
  );
  const sponsoredPools = sponsoredPoolData
    ? (sponsoredPoolData.sponsoredPools?.nodes as SponsoredPool[])
    : [];

  const totalCount = sponsoredPoolData?.sponsoredPools?.totalCount as number;

  useEffect(() => {
    if (joinedPoolInfo?.isSponsored) {
      const joinedPoolId = joinedPoolInfo?.asSponsored.toHuman();
      const foundPool = sponsoredPools.find(pool => pool.id === joinedPoolId);
      setJoinedPool(foundPool);
    } else {
      setJoinedPool(undefined);
    }
  }, [joinedPoolInfo, sponsoredPools]);

  return {
    joinedPoolInfo,
    isJoinedPool,
    isOwned,
    sponsoredPools,
    totalCount,
    setCurrentPage,
    currentPage,
    isLoading,
    refetch,
    joinedPool,
  };
};

export default useLoadSponsoredPool;
